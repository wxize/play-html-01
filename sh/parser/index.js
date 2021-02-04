// 将文本转化为数组对象
const path = require('path')
const reader = require('./utils/reader')
const Item = require('./Item')


// 定义输出的结构
let arr = []
let end = false



//测试：打印出文本文件的每一行
var fs = require('fs')
var source = fs.createReadStream(path.resolve(__dirname, '../../data/001.txt'))
source.pipe(reader)
reader.on('readable', function () {
  var line
  while (line = reader.read()) {
    if (line == '\r') {
        arr.push([])
    } else {
        let item = new Item(line)
        arr[arr.length - 1].push(item)
    }
  }

  if (!end) {
    if (!reader._lastLineData) {
        end = true
        console.log(arr)
        // writeFile()
        new Object2Html(arr)
        writeFile()
      }
  }
})

class Object2Html {
    constructor(arr) {

        for(let i = 0; i < arr.length; i++) {
            let tempArr = arr[i]
            for(let j = 0; j < tempArr.length; j++) {
                let item = tempArr[j]
                // 这是一个对象 ,, 将对象转成 html
                let attr = ''
                for (const key in item.attr) {
                    attr += ` ${key}="${item.attr[key]}"`
                }

                let style = 'style="'
                for (const key in item.style) {
                    style += `${key}:${item.style[key]};`
                }
                style += '"'

                tempArr[j] = `<${item.name} ${attr} ${style}>${item.data}</${item.name}>`
            }
        }
      
    }
}




// 写文件
function writeFile() {
    let str = 'let pages = ' + JSON.stringify(arr)
    fs.writeFileSync(path.resolve(__dirname, '../../app/config.js'), str)
    console.log(`写入完成`)
}




