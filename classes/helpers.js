const axios = require("axios");

module.exports = class Helper {
    static async getResponse(status, msg, data) {
        return {
            status,
            msg,
            data: data || null
        };
    }

    static async getURLStatuses(data) {
        let { linksArr } = data, arr = [], count = {}, requests;
        for (const item of linksArr) {
            for (const linkObj of item) {
                let href = linkObj.attribs.href ? linkObj.attribs.href : false;
                requests = href ? await axios.get(href).catch(err => {
                    let msg =  err.message;
                }) : false;
                requests ? arr.push({
                    url: href,
                    statusCode: requests.status
                }) : null;
                if (requests) {
                    console.log(href, requests.status);
                    if (!count[requests.status]) {
                        count[requests.status] = 0
                    }
                    count[requests.status] += 1;
                }
            }
        }
        return await this.getResponse(1, "Success", { data: arr, count })
    }
}