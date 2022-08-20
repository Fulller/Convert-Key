let $ = document.querySelector.bind(document)
let web =  document.documentElement
let app = {
    result: 0,
    mode: "DectoBin",
    element: {
        select1: $('#select1'),
        select2: $('#select2'),
        input: $('#input'),
        again: $('#again'),
        submit: $('#submit'),
        show: $('#show'),
        rotate: $('#rotate'),
    },
    handle: {
        DectoBin: function (value){
            value = value*1
            let result = '';
            while(value>0){
                result+=value%2
                value = Math.floor(value/2)
            }
            return result.split('').reverse().join('')
        },
        BintoDec: function (value){
            value = value.split('').reverse()
            let result = 0
            for(let index in value){
                if(value[index]==1){
                    result+=Math.pow(2,index)
                }
            }
            return result
        },
        OcttoBin: function (value){
            let result = []
            value = value.split('')
            for(let index in value){
                result[index]=app.handle.DectoBin(value[index])
            }
            return app.convert.threeBin(result).join('')
        },
        BintoOct: function (value){
            let result = []
            value = app.convert.threeBinArr(value)
            for(let index in value){
                result[index]=app.handle.BintoDec(value[index])
            }
            return result.join('')
        },
        HextoBin: function (value){
            let result = []
            value = app.convert.letterToNum(value)
            for(let item in value){
                result.push(app.handle.DectoBin(value[item].toString()))
            }
            return app.convert.fourBin(result).join('')
        },
        BintoHex: function (value){
            let result = []
            value = app.convert.fourBinArr(value)
            for(let index in value){
                result.push(app.handle.BintoDec(value[index]))
            }
            return app.convert.numtoLetter(result)
        },
        DectoOct: function (value){
            return this.BintoOct(this.DectoBin(value))
        },
        OcttoDec: function (value){
            return this.BintoDec(this.OcttoBin(value))
        },
        DectoHex: function (value){
            return this.BintoHex(this.DectoBin(value))
        },
        HextoDec: function (value){
            return this.BintoDec(this.HextoBin(value))
        },
        OcttoHex: function (value){
            return this.BintoHex(this.OcttoBin(value))
        },
        HextoOct: function (value){
            return this.BintoOct(this.HextoBin(value))
        }
    },
    convert: {
        letterToNum: function (value){
            let result = []
            for(let index in value){
                if(!(value[index]*1)){
                    result[index] = value[index].charCodeAt()-55
                }else{
                    result[index] = value[index]*1
                }
            }
            return result
        },
        numtoLetter: function (value){
            let result = value
            for(let index in value){
                if(value[index]>9){
                    result[index] = String.fromCharCode(55+value[index])
                }
            }
            return result.join('')
        },
        threeBin: function (value){
            let result = []
            for(let index in value){
                let temp = value[index].split('').reverse()
                let len = value[index].split('').length
                for(let i = 2;i>=len;i--){
                    temp[i]='0'
                }
                result[index]=temp.reverse().join('')
            }
            return result
        },
        threeBinArr: function (value){
            let result = []
            value = value.split('')
            let len = value.length
            if((len%3)!=0){
                value=value.reverse()
                let missing = 3-len%3
                for(let i = len;i<len+missing;i++){
                    value[i]=0
                }
                value=value.reverse()
            }
            for(let i in value){
                if((i*1+1)%3==0){
                    let start = i-2
                    let end = ++i
                    result.push(value.slice(start , end).join(''))
                }
            }
            
            return result
        },
        fourBin: function (value){
            let result = []
            for(let index in value){
                let temp = value[index].split('').reverse()
                let len = value[index].split('').length
                for(let i = 3;i>=len;i--){
                    temp[i]='0'
                }
                result[index]=temp.reverse().join('')
            }
            return result
        },
        fourBinArr: function (value){
            let result = []
            value = value.split('')
            let len = value.length
            if((len%4)!=0){
                value=value.reverse()
                let missing = 4-len%4
                for(let i = len;i<len+missing;i++){
                    value[i]=0
                }
                value=value.reverse()
            }
            for(let i in value){
                if((i*1+1)%4==0){
                    let start = i-3
                    let end = ++i
                    result.push(value.slice(start , end).join(''))
                }
            }
            return result
        }
    },
    handleEvent: function (){
        select1.oninput = function (){
            if(select1.value=='Hex'){
                input.type = 'text'
            }else{
                input.type = 'number'
            }
            input.focus()
        }
        select2.oninput = function (){
            input.focus()
        }
        again.onclick = function (){
            input.value = ''
            input.focus()
        }
        submit.onclick = function (){
            input.focus()
            app.mode = `${select1.value}to${select2.value}`
            if(app.handle[app.mode]){
                app.result = 0
                if(app.checkInput()){
                    app.result = app.handle[app.mode](input.value)
                }
                app.render()
            }
        }
        rotate.onclick = function (){
            let temp = select1.value
            select1.value = select2.value
            select2.value = temp
            if(select1.value=='Hex'){
                input.type = 'text'
            }else{
                input.type = 'number'
            }
            input.focus()
            app.mode = `${select1.value}to${select2.value}`
            rotate.animate([
                {transform: 'rotate(180deg)'}
            ],
                {
                    duration: 500,
                }
            ).play()
        }
    },
    checkInput: function (){
        if(select1.value=='Bin'){
            for(let i of input.value){
                if(i!=1&&i!=0){
                    app.result = 'Chỉ được nhập 0 và 1'
                    return false
                }
            }
            return true
        }else if(select1.value=='Oct'){
            for(let i of input.value){
                if(i<0||i>7){
                    app.result = 'Chỉ được nhập số từ 0 đến 7'
                    return false
                }
            }
            return true
        }else if(select1.value=='Hex'){
            for(let i of input.value){
                let charCode = i.charCodeAt()
                if((charCode<48||charCode>57)&&(charCode<65||charCode>70)){
                    app.result = 'Chỉ được nhập số từ 0 đến 10 và chữ cái A đến F'
                    return false
                }
            }
            return true
        }else{
            return true
        }
    },
    render: function(){
        app.element.show.innerText = this.result
    }
}
app.handleEvent()
