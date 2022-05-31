/*  Greenly Handler Library
    Functions included pertain to event-induced logic.
*/

const persistence   = require("../lib/persistence")

async function postPaymentHandler(orderId) {

    let order = await persistence.getOrderByID(orderId)

    if (order) {
        // Alter order status
        await persistence.changeOrderStatus(orderId, "PROCESSING")

        // Decrement stock
        await persistence.decrementSupplyStock(orderId)
    }
}

async function handleEmail(target, intent, details) {
    // TODO: Sort this out, requires using gmail's SMTP server since Amen's is paid
}

module.exports = {
    postPaymentHandler
}