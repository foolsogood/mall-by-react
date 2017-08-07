function checkIfHasThisKey(idx, obj) {
    let flag = false
    if (obj) {
        for (let j in obj) {
            if (j === idx) {
                flag = true
                break;
            }
        }
    }
    return flag
}
module.exports={
    checkIfHasThisKey:checkIfHasThisKey
}