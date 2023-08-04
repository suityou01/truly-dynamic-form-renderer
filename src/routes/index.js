const express = require('express');
const router = express.Router();
const metadata = require("./meta/metaRoutes");
const templates = require("./templates/templateRoutes");

router.use('/metadata', metadata);
router.use('/templates', templates);

module.exports = router;
