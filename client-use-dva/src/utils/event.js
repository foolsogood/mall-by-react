import {EventEmitter} from 'events';
let ee=new EventEmitter()
ee.setMaxListeners(50)
export default ee