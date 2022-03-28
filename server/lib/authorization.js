/*  Greenly Authorization Library
    Functions included pertain to user verification and resource limitation.
*/

function check(req, res, next) {
    // Identify resource type (locked routes only): User, Order, Warehouse, Distribution Center, Vehicle
    const resourceIdentification = {"/user/": "ALL_USERS",
                                    "/user/:userId": "SINGLE_USER",}

    const intent = req.method
    const incomingRoute = req.baseUrl + req.route.path
    const isAdministrator = (user) => {return user.type == "ADMINISTRATOR"}

    // TODO: Remove test lines
    console.log(incomingRoute)

    

    // Interpreting resource from path
    switch (resourceIdentification[incomingRoute]) {
        case "ALL_USERS":
            // Only an administrator can acccess information regarding all users    
            if (isAdministrator(req.user)) return next();
            break;
    
        case "SINGLE_USER":
            // Besides the user himself, only administrators and related transporters/suppliers can access and manipulate specific information
            // This is valid for: GET, PUT, DELETE
            if ((req.params.userId == user.id) ||
                (isAdministrator(req.user))) {
                return next();
            }

            // TODO: Complete part regarding related transporters and suppliers (e.g. have an order in common)


            break;
        default:
            break;
    }

    return res.status(403).send({message: "Insufficient permissions for specified resource."})
}

module.exports = {check}