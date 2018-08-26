import serverClient from './serverClient'
let getApiServer=(function() {
    const host = 'http://localhost:3001'
    let _sc
    return function () {
        if (!_sc) {
            _sc = new serverClient(host)
        }
        return _sc
    }

})()
const apiServer = getApiServer()
export default apiServer