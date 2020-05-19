'use strict';

const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const boom = require('boom');
const User = require('../models/User');

const config = require('../config');

function UserController() {

    const _this = this;
    _this.password = undefined;

    this.getUsers = async (req, reply) => {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.getSingleUser = async (req, reply) => {
        try {
            const user = await User.findById(req);
            return user;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.addUser = async (req, reply) => {
        try {
            const user = new User(req);
            await user.save();
            passport.authenticate('signup', {
                session: false
            }), async (req, res) => {
                res.json({
                    message: 'Signup successful',
                    user: user
                });
            };
            return user;
        } catch (err) {
            return err;
        }
    };

    this.updateUser = async (req, reply) => {
        try {
            const id = req[0];
            const user = req[1];
            const {
                ...updateData
            } = user;
            const update = await User.findByIdAndUpdate(id, updateData, {
                new: true
            });
            return update;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.deleteUser = async (req, reply) => {
        try {
            const id = req;
            const user = await User.findByIdAndRemove(id);
            return user;
        } catch (err) {}
    };

}


module.exports = UserController;