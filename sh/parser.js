// 将文本转化为数组对象
const path = require('path')
const reader = require('./utils/reader')


// 定义输出的结构
let arr = []
let end = false



//测试：打印出文本文件的每一行
var fs = require('fs')
var source = fs.createReadStream(path.resolve(__dirname, '../data/001.txt'))
source.pipe(reader)
reader.on('readable', function () {
  var line
  while (line = reader.read()) {
    if (line == '\r') {
        arr.push([])
    } else {
        arr[arr.length - 1].push(line.replace('\r', '').replace('\n', ''))
    }
  }

  if (!end) {
    if (!reader._lastLineData) {
        end = true
        console.log(arr)
        writeFile()
      }
  }
})

// 写文件
function writeFile() {
    let str = 'let pages = ' + JSON.stringify(arr)
    fs.writeFileSync(path.resolve(__dirname, '../app/config.js'), str)
    console.log(`写入完成`)
}

