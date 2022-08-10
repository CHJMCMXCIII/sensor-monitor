import { createStore } from 'vuex'

export default createStore({
    state: {
        sensors: [],
        sensor: {},
        isClosed: false
    },
    mutations: {
        CHANGE_SENSOR_CHART(state, payload) {
            // 배열의 길이가 10개보다 많다면 앞의 요소를 버리고
            // 뒤쪽에 요소를 추가해서 최신 데이터만 있도록 유지
            state.sensors.push(payload)
            if(state.sensors.length > 10) state.sensors.shift() // 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환. 배열의 길이를 변하게 한다.
            state.sensor = payload
        },
        CLOSE_SERVICE(state, payload) {
            console.log("CLOSE_SERVICE", payload)
            state.isClosed = true
        }
    },
    actions: {
        INIT_GET_SENSOR({ commit }, socket) {
            // 서버에서 io.emit("이벤트명") or socket.emit("이벤트명")으로 보내면 socket.on("이벤트명")으로 받아 처리할 수 있다.
            socket.on("sensor", data => commit("CHANGE_SENSOR_CHART", data))
        }
    },
    getters: {
        sensors : state => state.sensors,
        sensor : state => state.sensor,
    },
    modules: {

    }
})