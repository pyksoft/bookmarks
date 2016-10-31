export default {
    sendData,
    sendFailureMessage
};

function sendFailureMessage(error, res) {
    res.send({'status': 'failure', message: error});
}

function sendData(data, res) {
    data.status = 'success';
    res.send(data);
}