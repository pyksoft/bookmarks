import helper from './_controllerHelper';
import dataRepository from '../repositories/dataRepository';


export default {
    getTags,
    deleteTag,
    saveTag
};

function getTags(req, res) {
    dataRepository.getTags()
        .then((tags) => {
            return helper.sendData({tags}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function deleteTag(req, res) {
    let tagId = parseInt(req.params.id);

    dataRepository.deleteTag(tagId)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function saveTag(req, res) {
    let tag = req.body.tag;
    
    dataRepository.saveTag(tag)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}