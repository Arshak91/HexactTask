const express = require('express');
const router = express.Router();
const scannerController = require("../controllers/scannerController");

/* GET home page. */
router.get('/', async (req, res) => {
  res.json({status: 1, "msg": "Ok"})
});
router.post('/', scannerController.scanner);

module.exports = router;
