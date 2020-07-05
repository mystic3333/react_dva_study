const fs = require('fs')
const path = require('path')

let mock = {}

// 同步读取里面的文件和文件夹 , 第一个参数是路径, 第二个参数是一个执行成功之后的回调
fs.readdirSync(path.resolve(__dirname, './mock')).forEach(
    file => {
        // 对文件后缀进行匹配
        if(file.match(/\.js$/)) {
            console.log(require('./mock/' + file))
            Object.assign(mock, require('./mock/' + file))
        }
    }
)

export default mock
