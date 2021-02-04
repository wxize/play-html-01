module.exports = class Item {
    constructor(content) {
        
        this.name = 'div'
        this.attr = {
            class: 'item'
        }
        this.style = {}

        this.data = content
        this.fromat()
        this.type()        
    }

    fromat() {
        this.data = this.data
            .replace("\n", "")
            .replace("\r", "")
            .replace("\r\n")
    }

    type() {
        if (this.data.includes('.jpg') || this.data.includes('.png')) {
            this.name = 'img'
            let arr = this.data.split('?')
            this.attr.src = arr[0]
            if (arr.length > 1) {
                let size = arr[1].split('x')
                this.attr.width = size[0] + 'px'
                this.attr.height = size[1] + 'px'
            }
            this.data = ''
            return
        }

        // 文本
        else {
            this.name = 'div'
            // 样式
            this.style = {
                color: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6),
                'font-size': (Math.random() * 2 + 2) + 'rem'
            }
        }
    }
}
