const request = require('request');
const filterBy = require('./filterBy');

const status = (handle, searchBy) => {
    return new Promise((resolve, reject) => {
       const url = `https://codeforces.com/api/user.status?handle=${handle}`;
       const config = {
           url,
           json:true
       };

       request(config, (err, req, {result, status, comment}) => {
           if(status != "OK") {
               resolve({status, comment})
           }
           else if(searchBy.verdict === "anyVerdict"){
               resolve({status, result})
           }
           else resolve({status, result: filterBy(result, searchBy)})
       });
        
    });
};

module.exports = status