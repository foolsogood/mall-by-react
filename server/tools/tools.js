function guid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}
function getOrderId(){
    function n4(){
       return (((1+Math.random())*0x10000)|0).toString(10).substring(1);
        
    }
    return +new Date()+''+n4()+n4()+n4()
}
module.exports={
    guid,getOrderId
}