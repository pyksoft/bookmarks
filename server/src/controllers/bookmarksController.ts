import helper from './_controllerHelper';
import bookmarksRepository from '../repositories/bookmarksRepository';

export default {
    getBookmarks
};

function getBookmarks(req, res) {
    bookmarksRepository.getBookmarks()
        .then((data) => {
            return helper.sendData({data}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}