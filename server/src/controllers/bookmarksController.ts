import helper from './_controllerHelper';

export default {
    getBookmarks
};

function getBookmarks(req, res) {
    Promise.resolve([1, 2, 3])
        .then((data) => {
            return helper.sendData({data}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}