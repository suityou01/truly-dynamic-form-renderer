const fs = require('fs');
const path = require('path');

class FileLoaderService {
    #createAbsolutePath(relativePath){
        return path.join(__dirname, relativePath);
    }
    #checkFileExists(absolutePath) {
        return fs.existsSync(absolutePath);
    }
    load(relativePath){
        const absPath = this.#createAbsolutePath(relativePath);
        try {
            if(this.#checkFileExists(absPath)){
                return fs.readFileSync(absPath, 'utf-8');
            }
        }
        catch (e) {
            console.log(e);
            throw new Error(`Error reading file. Please check that the path exits and you have read permissions: ${absPath}`);
        }
        
    }
    listDirectories(relativePath){
        let dirs = [];
        const absolutePath = this.#createAbsolutePath(relativePath);
        const items = fs.readdirSync(absolutePath, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory()) {
                dirs.push(`${relativePath}${item.name}`);
                dirs = [
                    ...dirs,
                    ...(this.listDirectories(`${relativePath}${item.name}/`)),
                ];
            }
        };

        return dirs;
    }
    listFiles(relativePath) {
        let files = [];
        const absolutePath = this.#createAbsolutePath(relativePath);
        const items = fs.readdirSync(absolutePath, { withFileTypes: true });
        for (const item of items) {
            if (item.isFile()) {
                files.push(item.name);
            }
        }
        return files;
    }
}

module.exports = FileLoaderService