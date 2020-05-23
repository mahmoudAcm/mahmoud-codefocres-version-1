const take = (first, second) => {

    if(!second) return true

    const key = Object.keys(second)

    for(let i = 0 ; i < key.length; i++){
        if(first[key[i]] != second[key[i]]) return false ;
    } 

    return true;
}

const filterBy = (result, option) => {
   result = Array.from(result) 
   result = result.filter((q) => {
        return take(q, option) 
   })
   return result
}

module.exports = filterBy