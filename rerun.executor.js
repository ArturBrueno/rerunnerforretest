const { wrapExec, getFilesListWithSubDirs } = require('./rerun')

function createMochaCmd(pathToSpecFile) {
    return `./node_modules./bin/mocha ${pathToSpecFile}`
}

const commandsList = getFilesListWithSubDirs('./specs')
.map(createMochaCmd)
.map(wrapExec)

Array.from(Array(3)).reduce()
Promise.all(commandsList).then(console.log)
// console.log(commandsList);
