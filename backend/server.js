const constants = require('./constants')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
})
const util = require('./util')()
const sensorController = require('./controller/sensorController')
const PORT = process.env.PORT || 12010
const mongoose = require('mongoose')
const USER = 'user1'
const PWD = '2166'
const HOST = 'localhost:27017'
const db = 'sensor'
const SENSOR_FILE_PATH = path.join(__dirname, './data/data.csv')
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
let userList = [], idx = 0

const main = async () => {
    app.use(cors())
    mongoose.connect(mongodbURL)
        .then(() => console.log(`MONGO DB 가 ${util.getDate()} 에 연결되었어요.`)) // util.getDate ??
        .catch((err) => console.error(err))
    mongoose.set('useFindAndModify', false)

    const sensorList = await util.readCSV(SENSOR_FILE_PATH)
    const len = sensorList.length

    io.on('connection', async (socket) => {
        // 클라이언트와 서버가 연결되면 socket을 매개변수로 받을 수 있다.
        // io.on('connection', CALLBACK) 을 통해 io를 이용해서 이벤트가 발생했을 때 콜백함수 설정 가능
        // 연결 되었을을 로그로 표현되게 했음
        // userList에 연결된 소켓들을 push해서 나중에 관리할 수 있게 만들었다.
        // disconnect 되었다면 userList를 갱신한다.
        console.log(`사용자가 연결 되었어요. :: ${util.getDate()} ID: ${socket.id}`)
        userList.push(socket.id)
        socket.on('disconnect', () => {
            console.log(`사용자 연결이 끊어졌어요. :: ${util.getDate()} ID:${socket.id}`)
            userList.splice(userList.indexOf(socket.id), 1)
        })
    })

    idx = await sensorController.sendDataAndSaveDB(io, sensorList, idx)
    console.log(`현재 센서 정보를 유저에게 보내고 DB에 저장하세요. :: ${uteil.getDate()} ${JSON.stringify(sensorList[idx])}`)
    idx += 1

    const timeInterval = setInterval(async () => {
        // 1초마다 센서 데이터를 보내는 부분
        // constants에 정의한 간격을 받아와서 센서 데이터를 보내게 한다.
        idx = await sensorController.sendDataAndSaveDB(io, sensorList, idx)
        console.log(`현재 센서 정보를 유저에게 보내고 DB에 저장하세요. :: ${uteil.getDate()} index = ${idx} ${JSON.stringify(sensorList[idx])}`)
        idx += 1
        if(idx === len) {
            console.log(`센서 모니터링 서버를 닫으세요. :: ${util.getDate()}`)
            io.emit("closeSensorService", "bye bye")
            clearInterval(timeInterval)
        }
    }, constants.INTERVAL)
    http.listen(PORT, () => console.log(`센서 모니터링 서버를 시작합니다. ::: http://127.0.0.1:${PORT} :: ${util.getDate()}`))

}

main()