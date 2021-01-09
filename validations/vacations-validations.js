const notAdminValidation = (req, res, next) => {
    const {isAdmin} = req.user;
    if (isAdmin === 0) {
        return next();
    }
    return res.sendStatus(403);
}

const isAdminValidation = (req, res, next) => {
    const {isAdmin} = req.user;
    if (isAdmin === 1) {
        return next();
    }
    return res.sendStatus(403);
}

const addVacationValidation = (req, res, next) => {
    var pattern = /^([^0-9]*)$/;
    const {destination,price} = req.body;
    if (destination.match(pattern) && !isNaN(Number(price))){
        return next();
    }
    return res.sendStatus(400);
}


module.exports = {
    notAdminValidation,
    isAdminValidation,
    addVacationValidation
}