import io from 'socket.io-client'

export default {
    install: (app, {host}) => {
        // 전역변수로 소켓에 접근 가능하도록 설정
        // provide 를 루트노드에 넣고 하위 노드에서 inject를 통해 전역변수에 접근할 수 있다.
        const socketClient = io(`${host}`);
        app.config.globalProperties.$socket = socketClient
        app.provide('socket', socketClient)
    }
}