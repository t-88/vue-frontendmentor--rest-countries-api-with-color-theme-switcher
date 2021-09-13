export const parseNumber = ( num ) => {
    let strNum = String(num).split("")
    let newNum = []

    let len = strNum.length
    let ceil = Math.ceil(len / 3)
            
    for(let i = 0; i < ceil; i += 1){
        if( i != ceil - 1 ){ newNum.push(strNum.splice(len - 3, len).join("")) }
        else { newNum.push(strNum.join("")) }
        len = strNum.length
    }
    return newNum.reverse().join()
}
