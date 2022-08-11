const csv = require('csvtojson')
const form = date => ('00' + date).slice(-2)
// 0009 => 09 / 0012 => 12
const _ = require('fxjs/Strict')

const setType = data =>{
    for(let key in data){
        key === 'time' ? data[key] = new Date(data[key]) : data[key] = Number(data[key]) 
    } 
    return data
}

module.exports = () => {
    return {
        async readCSV(filePath) {
            const _return = _.go(
                await csv().fromFile(filePath),
                _.map(setType),
                _.takeAll,
            );

            return _return
        },
        getDate() {
            const d = new Date()
            return `${d.getFullYear()} - ${form(d.getMonth() + 1)}.${form(d.getDate())} ${form(d.getHours())}:${form(d.getMinutes())}:${form(d.getSeconds())}}`
        }
    }
}