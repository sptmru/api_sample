'use strict';

const Router = require("koa-router");
const router = new Router();

const SchoolController = require('../controllers/schoolController');
const schoolController = new SchoolController();

/* SCHOOL */

router.get('schools/', async (ctx) => {
    ctx.body = await schoolController.getSchools();
});

router.get('schools/:uid', async (ctx) => {
    ctx.body = await schoolController.getSingleSchool(ctx.params.uid);
});

router.post('schools', async (ctx) => {
    ctx.body = await schoolController.addSchool(ctx.request.body);
});

router.put('schools/:uid', async (ctx) => {
    ctx.body = await schoolController.updateSchool([ctx.params.uid, ctx.request.body]);
});

router.delete('schools/:uid', async (ctx) => {
    ctx.body = await schoolController.deleteSchool(ctx.params.uid);
});

/* SCHOOL SUGGESTION REQUEST */

router.get('schools/suggestions', async (ctx) => {
    ctx.body = await schoolController.getSchoolSuggestionRequests();
});

router.get('schools/:uid/suggestions', async (ctx) => {
    ctx.body = await schoolController.getSingleSchoolSuggestionRequest(ctx.params.uid);
});

router.post('schools/suggestions', async (ctx) => {
    ctx.body = await schoolController.addSchoolSuggestionRequest(ctx.request.body);
});

router.put('schools/:uid/suggestions', async (ctx) => {
    ctx.body = await schoolController.updateSchoolSuggestionRequest([ctx.params.uid, ctx.request.body]);
});

router.delete('schools/:uid/suggestions', async (ctx) => {
    ctx.body = await schoolController.deleteSchoolSuggestionRequest(ctx.params.uid);
});

module.exports = router;