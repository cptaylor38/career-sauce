const passport = require("passport");
const config = require("./config.js")
const db = require("../models");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt


passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, async function (jwtPayload, done) {
        try {
            const user = await db.User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            if (!user) {
                return done(new Error(), false)
            }
            return done(null, user)
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;