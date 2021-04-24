const axios = require("axios");
const cheerio = require('cheerio');
const Helpers = require("../classes/helpers");

exports.scanner = async (req, res) => {
    let { url } = req.body;
    if (!url) {
        return res.json(await Helpers.getResponse(0, "URL of undefined"))
    }
    let result, error = false;
    
    result = await axios.get(url).catch(async err => {
        err ? error = {
            message: err.message,
            status: 0
        } : false
    });
    if (error) {
        return res.json(await Helpers.getResponse(error.status, error.message))
    }
    let cherio = cheerio.load(result.data);
    let linksArr = [], data;

    let tagA = cherio('a'), tagB = cherio('link'), tagC = cherio('script'), arr = [], count = {};
    linksArr = linksArr.concat(tagA, tagB, tagC)

    data = await Helpers.getURLStatuses({ linksArr });
    console.log(data);
    res.json(data)
}