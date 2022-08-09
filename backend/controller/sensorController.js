const Sensor = require('../models/sensor.js')

const save = async(data) => {
    const _return = await Sensor.findOneAndUpdate(
        {
        "idx" : {
            $eq : data.idx
        }}, {
            $set: data
        }, {
            upsert: true,
            multi: true,
            new: true,
            setDefaultsOnInsert: true
        }
    ).lean()
    return _return
}

exports.sendDataAndSaveDB = (io, jsonArray, idx) => {
    return new Promise((resolve, reject) => {
        const data = jsonArray[idx]
        io.emit("sensor", data)
        save(data)
        resolve(idx)
    })
}