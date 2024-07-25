﻿# LemonUtilities
Simple JavaScript library that does a bunch of stuff.

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
const lemonutils = require('lemonutilities');
```

Down below, you will find a list of functions LemonUtils has to offer.

# Functions


## File Management

### readFile(filePath)
-   Description: returns file contents from a path.
-   Parameters:
    - `filePath` (`string`): Path to file
- Returns (`string`): File contents
- Example:
```javascript
const message = lemonutils.readFile('./message.txt');

// Hello, World!
console.log(message);
```

### writeFile(filePath, content)
-   Description: writes data to a file.
-   Parameters:
    - `filePath` (`string`): Path to file
    - `content` (`string`): Content to write to file
- Example:
```javascript
const message = 'Goodbye, World :(';

lemonutils.writeFile('./message.txt', message);
```

### readJSON(filePath)
-   Description: returns file contents from a path.
-   Parameters:
    - `filePath` (`string`): Path to file
- Returns (`object/array`): File contents
- Example:
```javascript
const JSONDat = lemonutils.readFile('./data.json');

// {message:"Hello, World!"}
console.log(JSONDat);
```

### writeJSON(filePath, content)
-   Description: writes JSON to a file.
-   Parameters:
    - `filePath` (`string`): Path to file
    - `content` (`object/array`): Content to write to file as JSON
- Example:
```javascript
const JSONDat = {message:"Goodbye, World :("};

lemonutils.writeFile('./data.json', JSONDat);
```

### checkPathExists(filePath)
-   Description: Check if a path exists
-   Parameters:
    - `filePath` (`string`): Path to check
- Returns (`bool`): true/false
- Example:
```javascript
if (lemonutils.checkPathExists('./goober/cat.png')) {
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
const images = lemonutils.getFiles('./goober', '.png');

// ['bird.png', 'cat.png', 'dog.png', 'sillygoober.png']
console.log(images);
```

### getDirectories(directoryPath)
-   Description: Gets subfolders from a folder or directory
-   Parameters:
    - `directoryPath` (`string`): Path to check
- Returns (`array`): Array of all subfolder names
- Example:
```javascript
const subfolders = lemonutils.getFiles('./goober');

// ['extra silly', 'very gooberish']
console.log(subfolders);
```

### moveFile(filePath, destinationFolderPath)
-   Description: Moves a file
-   Parameters:
    - `filePath` (`string`): Path to file
    - `destinationFolderPath` (`string`): Folder to move the file to
- Example:
```javascript
lemonutils.moveFile('./goober/cat.png', './goober/extra silly');
```

### renameFile(filePath, newFileName)
-   Description: Renames a file
-   Parameters:
    - `filePath` (`string`): File to rename
    - `newFileName` (`string`): New file name
- Example:
```javascript
lemonutils.renameFile('./goober/extra silly/cat.png', 'silly car.png');

```

### deleteFile(filePath)
-   Description: Deletes a file
-   Parameters:
    - `filePath` (`string`): File to delete
- Example:
```javascript
lemonutils.deleteFile('./message.txt');
```

### createFile(filePath)
-   Description: Creates a file
-   Parameters:
    - `filePath` (`string`): Path and file name
- Example:
```javascript
lemonutils.createFile('./message.txt');
```

### createDirectory(directoryPath)
-   Description: Creates a directory
-   Parameters:
    - `directoryPath` (`string`): Directory name
- Example:
```javascript
lemonutils.createDirectory('./goober/extra silly/VERY silly');
```

### copyFile(filePath, copiedFilePath)
-   Description: Copies a file
-   Parameters:
    - `filePath` (`string`): Path to file
    - `copiedFilePath` (`string`): New file path
- Example:
```javascript
lemonutils.copyFile('./goober/very silly/silly car.png', './goober of the day/silly car.png');
```

### calculateFileSize(filePath)
-   Description: Calculates the size of a file in bytes
-   Parameters:
    - `filePath` (`string`): Path to file
- Returns (`string`): Byte size
- Example:
```javascript
const size = lemonutils.calculateFileSize('./goober/bird.png');


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
const num = lemonutils.getRandomNum(0, 10);

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
const num = lemonutils.getRandomInt(0, 10);

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
const item = lemonutils.getRandomItem(items);

console.log(item);
```

### arrayShuffle(array)
-   Description: Shuffles an array
-   Parameters:
    - `array` (`array`):
- Returns (``): Shuffled array
- Example:
```javascript
const items = ['goober', 'cat', 'dog', 'bird', true, false, 7, 8.5];
const shuffledItems = lemonutils.arrayShuffle(items);

console.log(shuffledItems);
```

### UUID(version)
-   Description: Generates a UUID
-   Parameters:
    - `version` (`number`): UUID version to generate (currently supports version 4)
- Returns (`string`): Generated UUID
- Example:
```javascript
const uuid = lemonutils.UUID(4);

console.log(uuid);
```

### generateToken(prefix)
-   Description: Generates a random token for use in applications requiring secure identifiers
-   Parameters:
    - `prefix` (`string`, optional): Prefix of the token
- Returns (`string`): Generated token
- Example:
```javascript
const token = lemonutils.generateToken('LEM-');

console.log(token);
```


## Inputs

### consoleInput()
-   Description: Asks user for input
- Returns (`string`): Response
- Example:
```javascript
console.log('is the cat a goober? [y/n]\n\n');

lemonutils.consoleInput().then(response =>  {
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
    const response = await lemonutils.consoleInput();

    if (response.toLowerCase == 'y') {
        console.log('YAYAYAYAYAYY');
    } else {
        console.log('Aw man :(');
    }

    console.log('Gets printed after the user hits enter.');
}
```

### editLastLine(newLine)
-   Description: Edits the last line printed to the console
-   Parameters:
    - `newLine` (`string`): New console text
- Example:
```javascript
console.log('Not silly :(');
setTimeout(() => {
    lemonutils.editLastLine('Silliest as can be :3');
}, 2000);
```
