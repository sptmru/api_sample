'use strict';

const Router = require("koa-router");
const router = new Router();

const UserController = require('../controllers/userController');
const userController = new UserController();

router.get('users/', async (ctx) => {
    ctx.body = await userController.getUsers();
}); 

router.get('users/:uid', async (ctx) => {
    ctx.body = await userController.getSingleUser(ctx.params.uid);
});

router.post('users', async (ctx) => {
    ctx.body = await userController.addUser(ctx.request.body);
});

router.put('users/:uid', async (ctx) => {
    ctx.body = await userController.updateUser([ctx.params.uid, ctx.request.body]);
});

router.delete('users/:uid', async (ctx) => {
    ctx.body = await userController.deleteUser(ctx.params.uid);
});

module.exports = router;