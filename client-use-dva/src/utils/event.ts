import {EventEmitter} from 'events';
const ee=new EventEmitter()
ee.setMaxListeners(50)
export default ee