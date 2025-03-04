/*
 _     ____  __  __  ____  __  _  __ __  _____  _  _     _  _____  _  ____   ____ 
| |__ | ===||  \/  |/ () \|  \| ||  |  ||_   _|| || |__ | ||_   _|| || ===| (_ (_`
|____||____||_|\/|_|\____/|_|\__| \___/   |_|  |_||____||_|  |_|  |_||____|.__)__)

-- v2.1.1
*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { inflate } = require('zlib');

const file = {
    read(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            return content;
        } catch (error) {
            console.error('lemonutilities: Cannot read file:', error);
            return null;
        }
    },

    write(filePath, content) {
        try {
            if (this.checkPathAccessible(filePath)) {
                fs.writeFileSync(filePath, content);
            } else {
                console.error('lemonutilities: Cannot write to file: Specified path does not exist.');
            }
        } catch (error) {
            console.error('lemonutilities: Cannot write to file:', error);
            return null;
        }
    },

    checkPathAccessible(directoryPath) {
        try {
            fs.accessSync(directoryPath);
            return true;
        } catch {
            return false;
        }
    },

    checkPathExists(directoryPath) {
        try {
            return fs.existsSync(directoryPath);
        } catch {
            return false;
        }
    },

    getFiles(directoryPath, fileExtension = '') {
        try {
            const files = fs.readdirSync(directoryPath);
            const filteredFiles = files.filter((currentFile) => {
                const filePath = path.join(directoryPath, currentFile);
                const fileStats = fs.statSync(filePath);
                const ext = fileExtension ? `.${fileExtension}` : '';

                return (
                    fileStats.isFile() &&
                    (fileExtension === '' || path.extname(filePath) === ext)
                );
            });
            return filteredFiles;
        } catch (error) {
            console.error('lemonutilities: Cannot get files:', error);
            return [];
        }
    },

    getSubFolders(directoryPath) {
        try {
            const scanned = fs.readdirSync(directoryPath);
            const subfolders = scanned.filter(sub => {
                const subfolderPath = path.join(directoryPath, sub);
                return fs.statSync(subfolderPath).isDirectory();
            });

            return subfolders;
        } catch (error) {
            console.error('lemonutilities: Cannot get subfolders:', error);
            return [];
        }
    },

    moveDir(directoryPath, destinationFolderPath) {
        if (!this.checkPathAccessible(directoryPath)) {
            console.error('lemonutilities: Cannot move directory: Specified source directory does not exist or is not accessible.');
            return;
        }

        if (!this.checkPathAccessible(destinationFolderPath)) {
            console.error('lemonutilities: Cannot move directory: Specified destination directory does not exist or is not accessible.');
            return;
        }

        const baseDirName = path.basename(directoryPath);
        const destFolderPath = path.join(destinationFolderPath, baseDirName);

        if (this.checkPathExists(destFolderPath)) {
            console.error('lemonutilities: Cannot move directory: Another directory with the same name already exists.');
            return;
        }

        fs.rename(directoryPath, destFolderPath, (error) => {
            if (error) {
                console.error('lemonutilities: Cannot move directory:', error);
            }
        });
    },

    renameDir(directoryPath, newDirName) {
        try {
            if (!this.checkPathAccessible(directoryPath)) {
                console.error('lemonutilities: Cannot rename directory: Specified source directory does not exist or is not accessible.');
                return;
            }
    
            const baseDirName = path.dirname(directoryPath);
            const newName = path.join(baseDirName, newDirName);
    
            if (this.checkPathExists(newName)) {
                console.error('lemonutilities: Cannot rename directory: Another directory with the same name already exists.');
                return;
            }
    
            fs.rename(directoryPath, newName, (error) => {
                if (error) {
                    console.error('lemonutilities: Cannot rename directory:', error);
                }
            });
        } catch (error) {
            console.error('lemonutilities: Error renaming directory:', error);
        }
    },    

    deleteDir(directoryPath) {
        try {
            fs.rmdirSync(directoryPath, { recursive: true });
        } catch (error) {
            console.error('lemonutilities: Cannot delete directory:', error);
        }
    },

    createFile(filePath) {
        try {
            fs.writeFileSync(filePath, '');
        } catch (error) {
            console.error('lemonutilities: Cannot create file:', error);
        }
    },

    createDir(directoryPath) {
        try {
            fs.mkdirSync(directoryPath);
        } catch (error) {
            console.error('lemonutilities: Cannot create directory:', error);
        }
    },

    cloneFile(filePath, destinationFilePath) {
        try {
            if (!this.checkPathAccessible(filePath)) {
                console.error('lemonutilities: Cannot clone file: Specified source file does not exist or is not accessible.');
                return;
            }
    
            const destinationDir = path.dirname(destinationFilePath);
            if (!this.checkPathExists(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }
    
            if (!this.checkPathAccessible(destinationDir)) {
                console.error('lemonutilities: Cannot clone file: Specified destination directory does not exist or is not accessible.');
                return;
            }
    
            fs.copyFileSync(filePath, destinationFilePath);
        } catch (error) {
            console.error('lemonutilities: Cannot clone file:', error);
        }
    },    

    cloneDir(directoryPath, destinationFolderPath) {
        try {
            if (!this.checkPathAccessible(directoryPath)) {
                console.error('lemonutilities: Cannot clone directory: Specified source directory does not exist or is not accessible.');
                return;
            }
    
            if (!this.checkPathExists(destinationFolderPath)) {
                fs.mkdirSync(destinationFolderPath, { recursive: true });
            }
    
            if (!this.checkPathAccessible(destinationFolderPath)) {
                console.error('lemonutilities: Cannot clone directory: Specified destination directory is not accessible.');
                return;
            }
    
            const dirName = path.basename(directoryPath);
            const destinationFilePath = path.join(destinationFolderPath, dirName);
    
            if (this.checkPathExists(destinationFilePath)) {
                console.error('lemonutilities: Cannot clone directory: Another directory with the same name already exists.');
                return;
            }
    
            fs.mkdirSync(destinationFilePath);
    
            const items = fs.readdirSync(directoryPath);
            for (const item of items) {
                const sourceItemPath = path.join(directoryPath, item);
                const destinationItemPath = path.join(destinationFilePath, item);
    
                const itemStats = fs.statSync(sourceItemPath);
    
                if (itemStats.isDirectory()) {
                    this.cloneDir(sourceItemPath, destinationItemPath);
                } else if (itemStats.isFile()) {
                    this.cloneFile(sourceItemPath, destinationItemPath);
                }
            }
        } catch (error) {
            console.error('lemonutilities: Cannot clone directory:', error);
        }
    },        

    calculateDirSize(directoryPath) {
        try {
            const stats = fs.statSync(directoryPath);

            if (stats.isFile()) {
                return stats.size;
            }

            if (stats.isDirectory()) {
                let totalSize = 0;
                const files = fs.readdirSync(directoryPath);
                files.forEach((file) => {
                    const fullPath = path.join(directoryPath, file);
                    totalSize += this.calculateDirSize(fullPath);
                });
                return totalSize;
            }

            return 0;
        } catch (error) {
            console.error('lemonutilities: Cannot calculate file or directory size:', error);
            return null;
        }
    }
}

const random = {
    getNum(max, min) {
        return Math.random() * (max - min) + min;
    },

    getInt(max, min) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
    },

    getItem(array) {
        return array[this.getRandomInt(0, array.length - 1)];
    },

    arrayShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    generateToken(prefix = '') {
        let token = prefix;
        const chars = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_';

        for (let i = 0; i < 36; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }

        const timestamp = Date.now();
        token += `-${timestamp.toString().substring(0, timestamp.toString().length - 3)}`;

        return token;
    },

    getChance(...chances) {
        const totalProbability = chances.reduce((sum, prob) => sum + prob, 0);
        const randomValue = this.getRandomNum(0, totalProbability);
        
        let cumulativeProbability = 0;

        for (let i = 0; i < chances.length; i++) {
            cumulativeProbability += chances[i];

            if (randomValue < cumulativeProbability) {
                return i;
            }
        }
    }
}

const cli = {
    async consoleInput() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            rl.question('\n> ', answer => {
                rl.close();
                resolve(answer);
            });
        });
    },

    editLastLine(text) {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
        process.stdout.write(text);
        process.stdout.moveCursor(0, 1);
        process.stdout.cursorTo(0);
    },

    async wait(seconds, showCountdown) {
        return new Promise(resolve => {
            let remaining = seconds;
    
            if (showCountdown) {
                console.log(`\nWaiting... ${remaining}`);
            }
    
            const countdown = setInterval(() => {
                remaining--;
    
                if (showCountdown) {
                    this.editLastLine(`Waiting... ${remaining}`);
                }
    
                if (remaining <= 0) {
                    clearInterval(countdown);
                    resolve();
                }
            }, 1000);
        });
    },    

    async pause() {
        return new Promise(resolve => {
            console.log('\nPress any key to continue...');

            process.stdin.setRawMode(true);
            process.stdin.resume();

            process.stdin.once('data', () => {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                resolve();
            });
        });
    }
}

module.exports = { file, random, cli };
