'use strict';

const Router = require("koa-router");
const router = new Router();

const TeacherController = require('../controllers/teacherController');
const teacherController = new TeacherController();

/* TEACHER */

router.get('teachers/', async (ctx) => {
    ctx.body = await teacherController.getTeachers();
});

router.get('teachers/:uid', async (ctx) => {
    ctx.body = await teacherController.getSingleTeacher(ctx.params.uid);
});

router.post('teachers', async (ctx) => {
    ctx.body = await teacherController.addTeacher(ctx.request.body);
});

router.put('teachers/:uid', async (ctx) => {
    ctx.body = await teacherController.updateTeacher([ctx.params.uid, ctx.request.body]);
});

router.delete('teachers/:uid', async (ctx) => {
    ctx.body = await teacherController.deleteTeacher(ctx.params.uid);
});

/* TEACHER SUGGESTION REQUEST */

router.get('teachers/suggestions', async (ctx) => {
    ctx.body = await teacherController.getTeacherSuggestionRequests();
});

router.get('teachers/:uid/suggestions', async (ctx) => {
    ctx.body = await teacherController.getSingleTeacherSuggestionRequest(ctx.params.uid);
});

router.post('teachers/suggestions', async (ctx) => {
    ctx.body = await teacherController.addTeacherSuggestionRequest(ctx.request.body);
});

router.put('teachers/:uid/suggestions', async (ctx) => {
    ctx.body = await teacherController.updateTeacherSuggestionRequest([ctx.params.uid, ctx.request.body]);
});

router.delete('teachers/:uid/suggestions', async (ctx) => {
    ctx.body = await teacherController.deleteTeacherSuggestionRequest(ctx.params.uid);
});

module.exports = router;