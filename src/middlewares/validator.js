const { validationResult } = require('express-validator'); //TODO:

const validateResult = (req, res, next) => {
    try {
        console.log("entro al try de validator")
        validationResult(req).throw()
        return next()
    } catch (err) {
        console.log("entro al catch del validator");
        res.status(403)
        res.send({ errors: err.array() })
    }
}

module.exports = { validateResult }