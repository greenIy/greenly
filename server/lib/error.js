/* Error Handling Package */

function errorHandler(error, req, res, next) {
    if (error instanceof SyntaxError) {
      res.status(422).send({message:"Badly formed JSON payload."});
    } else {
      next();
    }
}

function defaultErr() {
    return {message: "Something went wrong."}
}

module.exports = {
    errorHandler,
    defaultErr
}

