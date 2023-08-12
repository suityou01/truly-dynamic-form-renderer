const MultiPartStream = require("../streams/multipart");
const VirusScanStream = require("../streams/virusscan");
const CompileStream = require("../streams/compile");

const multiPartStream = new MultiPartStream({ objectMode: true });
const virusScanStream = new VirusScanStream({ readableObjectMode: true, writableObjectMode: true});
const compileStream = new CompileStream({ readableObjectMode: true, writableObjectMode: true});

const getContentType = (req) => {
    return req.headers['content-type'];
}

const isMultiPart = (contentType) => {
    return contentType.includes('multipart/form-data');
}

const getBoundary = (contentType) => {
    if(!contentType) return;
    const parseFrom = contentType.indexOf('boundary=') + 'boundary='.length;
    const parseTo = contentType.lenth;
    return contentType.substring(parseFrom, parseTo);
}

const buildPipeLine = (async (req, res) => {
    const contentType = getContentType(req);
    const { templateid, sectionid, pageid } = req.params;
    if(!Services.templateService.isValidTemplateId(templateid)) return;
    if(isMultiPart(contentType)){
        multiPartStream._boundary = getBoundary(contentType);
        multiPartStream._request = req;
        multiPartStream._templateId = templateid;
        multiPartStream._sectionId = sectionid;
        multiPartStream._pageId = pageid;
        req
        //.pipe(process.stdout)
        .pipe(multiPartStream)
        .pipe(virusScanStream)
        .pipe(compileStream)
    }
});

module.exports = buildPipeLine;