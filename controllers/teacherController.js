'use strict';

const boom = require('boom');
const Teacher = require('../models/Teacher');
const TeacherSuggestionRequest = require('../models/TeacherSuggestionRequest');

function TeacherController() {

    /* TEACHERS */

    this.getTeachers = async (req, reply) => {
        try {
            const teachers = await Teacher.find();
            return teachers;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.getSingleTeacher = async (req, reply) => {
        try {
            const teacher = await Teacher.findById(req);
            return teacher;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.addTeacher = async (req, reply) => {
        try {
            const teacher = new Teacher(req);
            return teacher.save();
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.updateTeacher = async (req, reply) => {
        try {
            const id = req[0];
            const teacher = req[1];
            const {
                ...updateData
            } = teacher;
            const update = await Teacher.findByIdAndUpdate(id, updateData, {
                new: true
            });
            return update;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.deleteTeacher = async (req, reply) => {
        try {
            const id = req;
            const teacher = await Teacher.findByIdAndRemove(id);
            return teacher;
        } catch (err) {}
    };

    /* TEACHER SUGGESTION REQUEST */

    this.getTeacherSuggestionRequests = async (req, reply) => {
        try {
            const teacherSuggestionRequest = await TeacherSuggestionRequest.find();
            return teacherSuggestionRequest;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.getSingleTeacherSuggestionRequest = async (req, reply) => {
        try {
            const teacherSuggestionRequest = await TeacherSuggestionRequest.findById(req);
            return teacherSuggestionRequest;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.addTeacherSuggestionRequest = async (req, reply) => {
        try {
            const teacherSuggestionRequest = new TeacherSuggestionRequest(req);
            return teacherSuggestionRequest.save();
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.updateTeacherSuggestionRequest  = async (req, reply) => {
        try {
            const id = req[0];
            const teacherSuggestionRequest = req[1];
            const {
                ...updateData
            } = teacherSuggestionRequest;
            const update = await TeacherSuggestionRequest.findByIdAndUpdate(id, updateData, {
                new: true
            });
            return update;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.deleteTeacherSuggestionRequest = async (req, reply) => {
        try {
            const id = req;
            const teacherSuggestionRequest = await TeacherSuggestionRequest.findByIdAndRemove(id);
            return teacherSuggestionRequest;
        } catch (err) {}
    };

}

module.exports = TeacherController;
