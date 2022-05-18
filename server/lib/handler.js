/*  Greenly Handler Library
    Functions included pertain to event-induced logic.
*/

const persistence   = require("../lib/persistence")

async function postPaymentHandler(orderId) {

    // Alter order status
    await persistence.changeOrderStatus(orderId, "PROCESSING")

    // Decrement stock
    await persistence.decrementSupplyStock(orderId)

    // E-mail user
    //TODO: E-mail users about how their order is being processed
    
    // Notify suppliers
    //TODO: Notify suppliers regarding new orders to fulfill


}

async function handleEmail(target, intent, details) {
    // TODO: Sort this out, requires using gmail's SMTP server since Amen's is paid
}

module.exports = {
    postPaymentHandler
}