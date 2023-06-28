const axios = require('axios');

const sendFcm = (to, body) => {
    const accessToken = 'AAAAeLGJy7g:APA91bEilvEhIqJRGgzcFGnKqgv4CbiTQGtk76g41I13SoeEBQRyxqXxys73QSkM7ES02p3TqL25zhsyfDrPfSRjpIvSokoDB8Dw58c_CQAcZRjVzjQMwi2ieTS17xECK2YlZrsFGfCf';

    axios.post(`https://fcm.googleapis.com/fcm/send`, {
        to: to,
        notification: {
            title: "슈가맨워크/카고 관리자 센터",
            body: body
        }
    }, {
        headers: {
            Authorization: `key=${accessToken}`,
			withCredentials: true
        }
    });
};

module.exports = sendFcm;
