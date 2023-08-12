const MultiPartStream = require("./multipart");
const { EOL } = require("os");

const fixture = `----------------------------505849065582232366557729

Content-Disposition: form-data; name="field1"



Hello

----------------------------505849065582232366557729

Content-Disposition: form-data; name="field2"



World

----------------------------505849065582232366557729

Content-Disposition: form-data; name="field3"; filename="uploadableFile.txt"

Content-Type: text/plain



Hello World from

an uploadable file



----------------------------505849065582232366557729--


`
describe('./src/streams/multipart.js', () => {
    it('should match an encapsulation boundary', () => {
        const multipartStream = new MultiPartStream();
        multipartStream._boundary = '--------------------------464154636353865931858748';
        const line = `--${multipartStream._boundary}\r\n`;
        expect(multipartStream.isEncapsulationBoundary(line)).toBeTruthy();
    });
    it('should match the last encapsulation boundary', () => {
        const multipartStream = new MultiPartStream();
        multipartStream._boundary = '--------------------------464154636353865931858748';
        const line = `--${multipartStream._boundary}--\r\n`;
        expect(multipartStream.isLastEncapsulationBoundary(line)).toBeTruthy();
    });
    it('should get a key value', () => {
        const line = 'Content-Disposition: form-data; name="field2"';
        const multipartStream = new MultiPartStream();
        const result = multipartStream.getValue('name', line);
        expect(result).toEqual('field2');
    });
    it('should get a key value from a line part', () => {
        const linePart = 'form-data; name="field2"';
        const multipartStream = new MultiPartStream();
        const result = multipartStream.getValue('name', linePart);
        expect(result).toEqual('field2');
    });
    it('should match a form field content disposition', () => {
        const line = 'Content-Disposition: form-data; name="field2"';
        const multipartStream = new MultiPartStream();
        const result = multipartStream.getContentDisposition(line);
        expect(result).toBeTruthy();
        expect(result.type).toEqual('field');
        expect(result.name).toEqual('field2');
        expect(multipartStream._fields).toEqual([ { name: 'field2', type: 'field', value: '' } ]);
    });
    it('should match a form field file content disposition', () => {
        const line = `Content-Disposition: form-data; name="field3"; filename="uploadableFile.txt"`;
        const multipartStream = new MultiPartStream();
        const result = multipartStream.getContentDisposition(line);
        expect(result).toBeTruthy();
        expect(result.type).toEqual('file');
        expect(result.name).toEqual('field3');
        expect(result.filename).toEqual('loadableFile.txt');
        expect(multipartStream._files).toEqual([ { name: 'field3', type: 'file', filename: 'loadableFile.txt', content: "" } ]);
    });
    it('should ignore a single crlf if in fielddata state', () => {
        const line = EOL;
        const multipartStream = new MultiPartStream();
        multipartStream._state = multipartStream._states.FIELDDATA;
        multipartStream.parseLine(line);
        expect(multipartStream._state).toEqual(multipartStream._states.EOL);
        expect(multipartStream._previousState).toEqual(multipartStream._states.FIELDDATA);
    });
    it('should read a value and store it against the field when in fielddata state', () => {
        const line = "World";
        const multipartStream = new MultiPartStream();
        multipartStream._fields = [{
            name: 'field2',
            type: 'field'
        }];
        multipartStream._state = multipartStream._states.FIELDDATA;
        multipartStream.parseLine(line);
        expect(multipartStream._fields[0].value).toEqual(line);
    });
    it('should read a value and store it against the file when in the filedata state', () => {
        const line1 = "Hello World from\n";
        const line2 = "an uploadable file";
        const multipartStream = new MultiPartStream();
        multipartStream._files = [{
            name: 'field3',
            type: 'file',
            filename: "uploadableFile.txt",
            content: ""
        }];
        multipartStream._state = multipartStream._states.FILEDATA;
        multipartStream.parseLine(line1);
        multipartStream.parseLine(line2);
        expect(multipartStream._files).toEqual([
            {
              name: 'field3',
              type: 'file',
              filename: 'uploadableFile.txt',
              content: 'Hello World from\nan uploadable file'
            }
        ]);
    })
});