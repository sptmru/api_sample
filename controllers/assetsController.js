'use strict';

const boom = require('boom');
const Asset = require('../models/Asset');

function AssetsController() {

    this.getAssets = async (req, reply) => {
        try {
            const assets = await Asset.find();
            return assets;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.getSingleAsset = async (req, reply) => {
        try {
            const asset = await Asset.findById(req);
            return asset;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.addAsset = async (req, reply) => {
        try {
            const asset = new Asset(req);
            return asset.save();
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.updateAsset = async (req, reply) => {
        try {
            const id = req[0];
            const asset = req[1];
            const {
                ...updateData
            } = asset;
            const update = await Asset.findByIdAndUpdate(id, updateData, {
                new: true
            });
            return update;
        } catch (err) {
            throw boom.boomify(err);
        }
    };

    this.deleteAsset = async (req, reply) => {
        try {
            const id = req;
            const asset = await Asset.findByIdAndRemove(id);
            return asset;
        } catch (err) {}
    };

}

module.exports = AssetsController;