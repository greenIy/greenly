/*  Greenly Handler Library
    Functions included pertain to event-induced logic.
*/

/* Payment Handling */

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

module.exports = {
    postPaymentHandler
}