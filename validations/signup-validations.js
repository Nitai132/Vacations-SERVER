const _ = require('lodash');


const signupValidation = (req, res, next) => {
    const {first, last, password} = req.body;
    var pattern = /^([^0-9]*)$/;
    const fields = Object.keys(req.body);
    const fieldExists = _.size(_.difference(['first', 'last', 'username', 'password'], fields)) === 0;
    if (fieldExists && first.match(pattern) && last.match(pattern) && password.length > 5) {
        return next();
    }
    return res.sendStatus(400);
}



module.exports = {
    signupValidation
}