const {createHashedPassword} = require('./../services/user-utils');

module.exports = {
    localStrategyHandler: (username, password, done) => {
        global.mysqlConnection.execute('select * from users where username = ? and password = ?',[username, createHashedPassword(password)])
         .then(data => {
            const user = data[0][0];
            if (!user) {
                return done(null, false); // (failure)
            }
            return done(null, user); //(success)
         }).catch(err => {
             return done(err); //(failure)
         });
    },
    serializeUser: (user, done) => {
        done(null, user);
    },
    deserializeUser: (user, done) => {
        done(null, user);
    },
    isValid: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.sendStatus(401);
    }
}