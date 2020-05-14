'use strict';

const boom = require('boom');
const School = require('../models/School');
const SchoolSuggestionRequest = require('../models/TeacherSuggestionRequest');

function SchoolController() {

    /* SCHOOLS */

    this.getSchools = async (req, reply) => {
        try {
            const schools = await School.find();
            return schools;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.getSingleSchool = async (req, reply) => {
        try {
            const school = await School.findById(req);
            return school;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.addSchool = async (req, reply) => {
        try {
            const school = new School(req);
            return school.save();
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.updateSchool = async (req, reply) => {
        try {
            const id = req[0];
            const school = req[1];
            const {
                ...updateData
            } = school;
            const update = await School.findByIdAndUpdate(id, updateData, {
                new: true
            });
            return update;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.deleteSchool = async (req, reply) => {
        try {
            const id = req;
            const school = await School.findByIdAndRemove(id);
            return school;
        } catch (err) {}
    };

    /* SCHOOL SUGGESTION REQUEST */

    this.getSchoolSuggestionRequests = async (req, reply) => {
        try {
            const schoolSuggestionRequests = await SchoolSuggestionRequest.find();
            return schoolSuggestionRequests;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.getSingleSchoolSuggestionRequest = async (req, reply) => {
        try {
            const schoolSuggestionRequest = await SchoolSuggestionRequest.findById(req);
            return schoolSuggestionRequest;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.addSchoolSuggestionRequest = async (req, reply) => {
        try {
            const schoolSuggestionRequest = new SchoolSuggestionRequest(req);
            return schoolSuggestionRequest.save();
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.updateSchoolSuggestionRequest = async (req, reply) => {
        try {
            const id = req[0];
            const schoolSuggestionRequest = req[1];
            const {
                ...updateData
            } = schoolSuggestionRequest;
            const update = await SchoolSuggestionRequest.findByIdAndUpdate(id, updateData, {
                new: true
            });
            return update;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.deleteSchoolSuggestionRequest = async (req, reply) => {
        try {
            const id = req;
            const schoolSuggestionRequest = await SchoolSuggestionRequest.findByIdAndRemove(id);
            return schoolSuggestionRequest;
        } catch (err) {}
    };

}

module.exports = SchoolController;
