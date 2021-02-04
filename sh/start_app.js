const process = require('child_process')
const path = require('path')
const cmd = 'start ' + path.resolve(__dirname, '../app/index.html')

process.exec(cmd, (err, stdout, stderr) => {
    // 
})