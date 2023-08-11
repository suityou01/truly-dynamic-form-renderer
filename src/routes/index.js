const express = require('express');
const router = express.Router();
const metadata = require("./meta/metaRoutes");
const templates = require("./templates/templateRoutes");
const render = require("./render/renderRoutes");

router.use('/metadata', metadata);
router.use('/templates', templates);
router.use('/render', render);

module.exports = router;
