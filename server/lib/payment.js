/*  Greenly Payment Library
    Functions included pertain to Stripe communication, intent creation and general payment-related logic.
*/


const persistence   = require("../lib/persistence")
const stripe    = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

async function createPaymentIntent(orderId) {

    let order = await persistence.getOrderByID(orderId)

    if (!order) {
        return "INVALID_ORDER"
    }

    let isAwaitingPayment = order.items.every((item) => item.status == "AWAITING_PAYMENT")

    if (!isAwaitingPayment) {
        return "INVALID_STATUS"
    }

    // Calculating the total order price

    totalPrice = order.items.reduce((accumulator, current) => accumulator + Number(current.supply_price)*Number(current.quantity) + Number(current.transport_price), 0);

    // Creating payment intent (in the lowest denominator for EUR: cents)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice*100,
        currency: 'eur',
        metadata: {
            order_id: orderId,
            user_id: order.consumer
        },
    })

    return paymentIntent.client_secret

}

module.exports = {
    createPaymentIntent
}