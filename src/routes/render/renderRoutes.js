const pipelineBuilder = require("../../builders/pipelineBuilder");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200);
    res.send(JSON.stringify(engine.getAllTemplates(), null, 2));
    return;
});
router.get('/:name', (req, res) => {
    const { name } = req.params;
    res.status(200);
    res.send(JSON.stringify(engine.getTemplateByTemplateObjectName(name), null, 2));
    return;
});
router.post('/:templateid/:sectionid/:pageid', async (req, res, next) => {
    await pipelineBuilder(req, res);
    res.status(200);
    res.end();
});

module.exports = router;