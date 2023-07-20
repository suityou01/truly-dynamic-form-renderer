const fs = require('fs');
const path = require('path');

class FileLoaderService {
    static #createAbsolutePath(relativePath){
        return path.join(__dirname, relativePath);
    }
    static #checkFileExists(absolutePath) {
        return fs.existsSync(absolutePath);
    }
    static load(relativePath){
        const absPath = FileLoaderService.#createAbsolutePath(relativePath);
        if(FileLoaderService.#checkFileExists(absPath)){
            return fs.readFileSync(absPath, 'utf-8');
        }
        throw new Error(`Error reading file. Please check that the path exits and you have read permissions: ${absPath}`);
    }
    static listDirectories(relativePath){
        const absPath = FileLoaderService.#createAbsolutePath(relativePath);
        if(FileLoaderService.#checkFileExists(absPath)){
            return fs.readdirSync(absPath);
        }
        return [];
    }
    static listFiles(relativePath) {
        return FileLoaderService.listDirectories(relativePath);
    }
}

module.exports = FileLoaderService