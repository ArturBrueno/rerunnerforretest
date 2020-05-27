const { wrapExec } = require('./exec.wrapper')
const { DEBUG } = process.env
const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))


async function rerunner(commadsArr, rerunCount = 3, threadsCount = 2) {
    
    let counter = 0
    
    async function rerunCommands(cmds, failedCommands = []) {
        async function executeOneCommand() {
            if(counter < threadsCount && cmds.length) { 
                counter++
                const cmd = await wrapExec(cmds.splice(0, 1) [0])
                if(cmd) {
                    failedCommands.push(cmd)
                }
                counter--
            }
        }
    
        const watcher = setInterval(executeOneCommand, 100)
    
        do {
            await executeOneCommand()
            if(cmds.length || counter) {
                await sleep(250)
            }
        } while (cmds.length || counter)
    
        clearInterval(watcher)
    
        return failedCommands
    }

    const failedCommands = await Array.from(Array(rerunCount)).reduce((acc, cur, index) => {
        return acc
        .then((resolvedCommands) => rerunCommands(resolvedCommands))
        .then((results) => {
            console.log(`Execution index is: ${index}`)
            console.log('____________________________')
            console.log('Failed commands is', results)
            console.log('____________________________')
            return results            
        })
    }, Promise.resolve(commadsArr))

    return failedCommands
}


  module.exports = {
    rerunner
  }


  // const cmds = [
//     './node_modules./bin/mocha C:\\Users\\User\\Documents\\NewRepo\\rerunnerforretest\\specs\\module1\\module.1.1.spec.js',
//     './node_modules./bin/mocha C:\\Users\\User\\Documents\\NewRepo\\rerunnerforretest\\specs\\module1\\module.1.2.spec.js',
//     './node_modules./bin/mocha C:\\Users\\User\\Documents\\NewRepo\\rerunnerforretest\\specs\\module1\\module.1.3.spec.js',
//     './node_modules./bin/mocha C:\\Users\\User\\Documents\\NewRepo\\rerunnerforretest\\specs\\module2\\module.2.1.spec.js',
//     './node_modules./bin/mocha C:\\Users\\User\\Documents\\NewRepo\\rerunnerforretest\\specs\\module2\\module.2.2.spec.js',
//     './node_modules./bin/mocha C:\\Users\\User\\Documents\\NewRepo\\rerunnerforretest\\specs\\module2\\module.2.3.spec.js'
//   ]

//   rerunCommands(cmds).then(console.log);