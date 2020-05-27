const { wrapExec } = require('./exec.wrapper.js')
const { getFilesListWithSubDirs } = require('./read.dir.sync.js')

module.exports = {
    wrapExec,
    getFilesListWithSubDirs
}