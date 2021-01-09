const badRequestHandler = res => res.sendStatus(400);

const SuccessRequestHandler = res => res.sendStatus(200);

module.exports = {badRequestHandler, SuccessRequestHandler};