'use strict';

const Koa = require("koa");
const KoaBody = require('koa-body');
const Router = require("koa-router");
const logger = require('koa-logger');

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./config');
const User = require('./models/User'); //we need it here for authentication setupß

const mongoose = require('mongoose');
const crypto = require('crypto');

const swagger = require('swagger-koa');

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

//Create a passport middleware to handle user registration
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        //Save the information provided by the user to the the database
        const user = await User.create({
            email,
            password
        });
        //Send the user information to the next middleware
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await User.findOne({
            email
        });
        if (!user) {
            //If the user isn't found in the database, return a message
            return done(null, false, {
                message: 'User not found'
            });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, {
                message: 'Wrong Password'
            });
        }
        //Send the user information to the next middleware
        return done(null, user, {
            message: 'Logged in Successfully'
        });
    } catch (error) {
        return done(error);
    }
}));

mongoose.connect("mongodb://mongodb:27017/backend", mongooseOptions)
    .then(() => {})
    .catch(err => console.log(err));

const jwt = require('jsonwebtoken');

const app = new Koa();
const api = new Router();

app.use(swagger.init({
    apiVersion: '0.1',
    swaggerVersion: '2.0',
    swagger: '2.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: '/swagger-ui',
    basePath: 'http://localhost',
    info: {
        title: 'Swagger',
        description: 'Swagger for backend app'
    },
    apis: ['./api.yml']
}));

app.use(passport.initialize());
app.use(new KoaBody());
app.use(logger());

api.prefix(config.apiBasePath);

api.get("/", async function (ctx) {
    ctx.body = {
        message: "Welcome",
        code: 200
    };
});

api.post("/login", async function (req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occurred');
                return error;
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) {
                    return error;
                }
                const body = {
                    _id: user._id,
                    email: user.email
                };
                const token = jwt.sign({
                    user: body
                }, config.jwtsecret);
                return res.json({
                    email: user.email,
                    token: token
                });
            });
        } catch (error) {
            return error;
        }
    })(req, res, next);
});

/* ROUTING */

const school = require('./routes/School.js');
api.use('/', school.routes());

const teacher = require('./routes/Teacher.js');
api.use('/', teacher.routes());

const asset = require('./routes/Assets.js');
api.use('/', asset.routes());

const user = require('./routes/Users.js');
api.use('/', user.routes());

app.use(api.routes());
app.use(api.allowedMethods());

console.log("Listening on port " + config.apiPort);
app.listen(config.apiPort);