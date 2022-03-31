/*  Greenly Authorization Library
    Functions included pertain to user verification and resource limitation.
*/

const authentication = require("./authentication"); // One-time-usage for administrator creation

async function check(req, res, next) {
    // Identify resource type (locked routes only): User, Order, Warehouse, Distribution Center, Vehicle
    const resourceIdentification = {"/user/": "ALL_USERS",
                                    "/user/:userId": "SINGLE_USER",}

    const intent = req.method

    const incomingRoute = req.baseUrl + req.route.path
    const isAdministrator = (user) => {return user.type == "ADMINISTRATOR"}
    

    // Interpreting resource from path
    switch (resourceIdentification[incomingRoute]) {
        case "ALL_USERS":

            /* Special situation in which a new administrator is being created */
            if (intent == "POST") {
                // Only administrators can create other administrators.
                // This is valid for: POST
                
                if (req.body.type == "ADMINISTRATOR") {

                    // This snippet is wrapped in a Promise so that it waits for the authentication middlware to run (otherwise it wouldn't wait for callback)
                    let authenticationPromise = await new Promise((resolve) => {
                        authentication.check(req, res, () => {
                            resolve()
                        })
                    })

                    // After authentication middle was been called and resolved successfully
                    if (isAdministrator(req.user)) {
                        // Allow a currently logged-in administrator to create a new administrator
                        return next()
                    }

                } else {
                    return next()
                }
            } 
            
            /* For any other access to ALL_USERS */
            else {
                // Only an administrator can access information regarding all users    
                if (isAdministrator(req.user)) return next();
            }
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