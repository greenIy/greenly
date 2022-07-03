/*  Greenly Handler Library
    Functions included pertain to event-induced logic.
*/

const persistence  = require("../lib/persistence")
const nodemailer = require('nodemailer');

/* Payment Handling */

async function postPaymentHandler(orderId) {

    let order = await persistence.getOrderByID(orderId)

    if (order) {
        // Alter order status
        await persistence.changeOrderStatus(orderId, "PROCESSING")

        // Decrement stock
        await persistence.decrementSupplyStock(orderId)
    }
}

/* E-mail Handling */

async function emailHandler(notification) {

    // Building email HTML

    let userInfo = await persistence.getUserByID(notification.user)

    let emailHTML = 
    `
    <!DOCTYPE html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width"/>
            <style>
                    * { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; line-height: 1.65; }
                    img { max-width: 100%; margin: 0 auto; display: block; }
                    body, .body-wrap { width: 100% !important; height: 100%; background: #f8f8f8; }
                    a { color: #52c788; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .text-left { text-align: left; }
                    .button { display: inline-block; color: white; background: #52c788; border: solid #52c788; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }
                    .button:hover { text-decoration: none; }
                    h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }
                    h1 { font-size: 32px; }
                    h2 { font-size: 28px; }
                    h3 { font-size: 24px; }
                    h4 { font-size: 20px; }
                    h5 { font-size: 16px; }
                    p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }
                    .container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 580px !important; }
                    .container table { width: 100% !important; border-collapse: collapse; }
                    .container .masthead { padding: 80px 0; background: #52c788; color: white; }
                    .container .masthead h1 { margin: 0 auto !important; max-width: 90%;}
                    .container .content { background: white; padding: 30px 35px; }
                    .container .content.footer { background: none; }
                    .container .content.footer p { margin-bottom: 0; color: #888; text-align: center; font-size: 14px; }
                    .container .content.footer a { color: #888; text-decoration: none; font-weight: bold; }
                    .container .content.footer a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
        <table class="body-wrap">
            <tr>
                <td class="container">
                    <table>
                        <tr>
                            <td align="center" class="masthead">

                                <h1>Greenly</h1>

                            </td>
                        </tr>
                        <tr>
                            <td class="content">

                                <h2>Olá ${userInfo.first_name} ${userInfo.last_name},</h2>

                                <p>${notification.content}</p>

                                <table>
                                    <tr>
                                        <td align="center">
                                            <p>
                                                <a href="http://greenly.pt/perfil/encomendas" class="button">Acompanhe a sua encomenda online</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <p><em>– Equipa Greenly</em></p>

                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
            <tr>
                <td class="container">
                    <table>
                        <tr>
                            <td class="content footer" align="center">
                                <p>Enviado por <a href="#">Greenly</a>, Campo Grande 016, 1749-016 Lisboa</p>
                                <p><a href="mailto:">support@greenly.pt</a> | <a href="#">Remover Subscrição</a></p>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
        </body>
        </html>
    `

    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
     });

     const mailOptions = {
        from: process.env.EMAIL_ADDRESS, 
        to: userInfo.email, 
        subject: `🌿 Greenly | ${notification.title}`, 
        html: emailHTML,
        text: emailHTML,
        
   };
   
   transport.sendMail(mailOptions, function(err, info) {
       if (err) {
         persistence.report(err)
       }
   });

}

module.exports = {
    postPaymentHandler,
    emailHandler
}