'use strict';

const Router = require("koa-router");
const router = new Router();

const AssetsController = require('../controllers/assetsController');
const assetsController = new AssetsController();

router.get('assets/', async (ctx) => {
    ctx.body = await assetsController.getAssets();
});

router.get('assets/:uid', async (ctx) => {
    ctx.body = await assetsController.getSingleAsset(ctx.params.uid);
});

router.post('assets', async (ctx) => {
    ctx.body = await assetsController.addAsset(ctx.request.body);
});

router.put('assets/:uid', async (ctx) => {
    ctx.body = await assetsController.updateAsset([ctx.params.uid, ctx.request.body]);
});

router.delete('assets/:uid', async (ctx) => {
    ctx.body = await assetsController.deleteAsset(ctx.params.uid);
});

module.exports = router;
