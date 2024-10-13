# LemonUtilities
LemonUtilities is a lightweight and simple JavaScript library for file management, randomization, and for CLIs (Console User Interfaces).

# Setup


## Installation

Go to your console, and type the following commands in order

```bash
cd "C:/path/to/your/project"
```
```bash
npm install lemonutilities
```

## How to Use
In your main JavaScript file, write the following

```javascript
const {file, random, cli} = require('lemonutilities');
```

Down below, you will find a list of functions LemonUtils has to offer.

# Functions


## File Management

### read(filePath)
-   Description: returns file contents from a path.
-   Parameters:
    - `filePath` (`string`): Path to file
- Returns (`string`): File contents
- Example:
```javascript
const message = file.read('message.txt');

// Hello, World!
console.log(message);
```

### write(filePath, content)
-   Description: writes data to a file.
-   Parameters:
    - `filePath` (`string`): Path to file
    - `content` (`string`): Content to write to file
- Example:
```javascript
const message = 'Goodbye, World :(';

file.write('message.txt', message);
```

### checkPathAccessible(directoryPath)
-   Description: Check if a path is accessible by your script
-   Parameters:
    - `directoryPath` (`string`): Path to check
- Returns (`bool`): true/false
- Example:
```javascript
if (file.checkPathExists('goober/cat.png')) {
    console.log('cat.png exists!');
} else {
    console.log('cat.png does not exist :(');
}
```

### checkPathExists(directoryPath)
-   Description: Check if a path exists
-   Parameters:
    - `directoryPath` (`string`): Path to check
- Returns (`bool`): true/false
- Example:
```javascript
if (file.checkPathExists('goober/cat.png')) {
    console.log('cat.png exists!');
} else {
    console.log('cat.png does not exist :(');
}
```

### getFiles(directoryPath, fileExtension)
-   Description: Gets files from a folder or directory
-   Parameters:
    - `directoryPath` (`string`): Path to check
    - `fileExtension` (`string`, optional): File extension to check for
- Returns (`array`): Array of all file names
- Example:
```javascript
const images = file.getFiles('goober', 'png');

// ['bird.png', 'cat.png', 'dog.png', 'sillygoober.png']
console.log(images);
```

### getSubFolders(directoryPath)
-   Description: Gets subfolders from a folder or directory
-   Parameters:
    - `directoryPath` (`string`): Path to check
- Returns (`array`): Array of all subfolder names
- Example:
```javascript
const subfolders = file.getSubFolders('goober');

// ['extra silly', 'very gooberish']
console.log(subfolders);
```

### moveDir(directoryPath, destinationFolderPath)
-   Description: Moves a file, or an entire folder
-   Parameters:
    - `directoryPath` (`string`): Path to file
    - `destinationFolderPath` (`string`): Folder to move the file to
- Example:
```javascript
file.moveDir('goober/cat.png', 'goober/extra silly');
```

### renameDir(directoryPath, newFileName)
-   Description: Renames a file, or a folder
-   Parameters:
    - `directoryPath` (`string`): File to rename
    - `newFileName` (`string`): New file name
- Example:
```javascript
file.renameDir('goober/extra silly/cat.png', 'silly car.png');

```

### deleteDir(directoryPath) (DANGEROUS)
-   Description: Deletes a file, or an entire folder
-   Parameters:
    - `directoryPath` (`string`): File to delete
- Example:
```javascript
file.deleteDir('message.txt');
```

### createFile(filePath)
-   Description: Creates a file
-   Parameters:
    - `filePath` (`string`): Path and file name
- Example:
```javascript
file.createFile('message.txt');
```

### createDir(directoryPath)
-   Description: Creates a directory
-   Parameters:
    - `directoryPath` (`string`): Directory name
- Example:
```javascript
file.createDir('goober/extra silly/VERY silly');
```

### cloneFile(filePath, destinationFolderPath)
-   Description: Clones a file to a specified destination
-   Parameters:
    - `filePath` (`string`): Path to file
    - `destinationFolderPath` (`string`): New file path
- Example:
```javascript
file.cloneFile('goober/very silly/silly car.png', 'goober of the day/silly car.png');
```

### cloneDir(directoryPath, destinationFolderPath)
-   Description: Clones a folder and all contents to a specified destination
-   Parameters:
    - `directoryPath` (`string`): Path to file
    - `destinationFolderPath` (`string`): New file path
- Example:
```javascript
file.cloneDir('goober/very silly/silly car.png', 'goober of the day/silly car.png');
```

### calculateDirSize(directoryPath)
-   Description: Calculates the size of a file or folder contents in bytes
-   Parameters:
    - `directoryPath` (`string`): Path to file
- Returns (`string`): Byte size
- Example:
```javascript
const size = file.calculateDirSize('goober/bird.png');


// bird.png is 295419 bytes. (295.419KB)
console.log(`bird.png is ${size} bytes. (${size/1000}KB)`);
```


## Randomness

### getRandomNum(min, max)
-   Description: Returns a random number
-   Parameters:
    - `min` (`number`): Minimum value
    - `max` (`number`): Maximum value
- Returns (`num`): Random number
- Example:
```javascript
const num = random.getRandomNum(0, 10);

console.log(num);
```

### getRandomInt(min, max)
-   Description: Returns a random whole number
-   Parameters:
    - `min` (`number`): Minimum value
    - `max` (`number`): Maximum value
- Returns (`num`): Random number
- Example:
```javascript
const num = random.getRandomInt(0, 10);

console.log(num);
```

### getRandomItem(array)
-   Description: Returns a random item from an array
-   Parameters:
    - `array` (`array`): Array to get item from
- Returns (`any`): Random item
- Example:
```javascript
const items = ['goober', 'cat', 'dog', 'bird', true, false, 7, 8.5];
const item = random.getRandomItem(items);

console.log(item);
```

### arrayShuffle(array)
-   Description: Shuffles an array
-   Parameters:
    - `array` (`array`):
- Returns (`array`): Shuffled array
- Example:
```javascript
const items = ['goober', 'cat', 'dog', 'bird', true, false, 7, 8.5];
const shuffledItems = random.arrayShuffle(items);

console.log(shuffledItems);
```

### generateToken(prefix)
-   Description: Generates a random token for use in applications requiring secure identifiers
-   Parameters:
    - `prefix` (`string`, optional): Prefix of the token
- Returns (`string`): Generated token
- Example:
```javascript
const token = random.generateToken('LEM-');

console.log(token);
```


## Inputs

### consoleInput() (async function)
-   Description: Asks user for input
- Returns (`string`): Response
- Example:
```javascript
console.log('is the cat a goober? [y/n]\n\n');

cli.consoleInput().then(response =>  {
    if (response.toLowerCase == 'y') {
        console.log('YAYAYAYAYAYY');
    } else {
        console.log('Aw man :(');
    }
});

console.log('Gets printed after, but before the user hits enter.');
```
OR
```javascript
console.log('is the cat a goober? [y/n]\n\n');

// This function needs to be async
async function askQuestion() {
    const response = await cli.consoleInput();

    if (response.toLowerCase == 'y') {
        console.log('YAYAYAYAYAYY');
    } else {
        console.log('Aw man :(');
    }

    console.log('Gets printed after the user hits enter.');
}

askQuestion();
```

### editLastLine(newLine)
-   Description: Edits the last line printed to the console
-   Parameters:
    - `newLine` (`string`): New console text
- Example:
```javascript
console.log('Not silly :(');
setTimeout(() => {
    cli.editLastLine('Silliest as can be :3');
}, 2000);
```

### wait(seconds) (async function)
-   Description: Waits a specified amount of time in seconds before allowing further code to run
-   Parameters:
    - `seconds` (`number`): Time to wait in seconds
- Example:
```javascript
// This function needs to be async
async function waitExample() {
    console.log('Cloning folder in 5 seconds...');

    await cli.wait(5);

    file.cloneDir('goober/very silly', 'important');
}

waitExample();
```

### pause()
-   Description: Stops further code from running, and displays a "hit any key to continue" message
- Example:
```javascript
console.log('Done!');

cli.pause();

console.log('But there\'s more!');
```
