const { wrapExec } = require('./exec.wrapper')

let counter = 0
const threadsCount = 3
const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

function rerunCommands(cmds, failedCommands = []) {
    async function executeOneCommand() {
        if(counter < threadsCount) { 
            counter++
            const cmd = await wrapExec(cmds.splice(0, 1) [0])
            if(cmd) {
                failedCommands.push(cmd)
            }
            counter--
        }
    }

    do {
        await executeOneCommand()
        if(cmds.length || counter) {
            await sleep(250)
        }
    } while (cmds.length || counter)

    clearInterval(watcher)

    return failedCommands
}