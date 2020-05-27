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
               return;
           }

           if(searchBy.verdict !== "anyVerdict") result = filterBy(result, searchBy)

           let accepted = new Map()

            result.filter((sol) => {
                if(sol.verdict === "OK"){
                    const contestId = sol.contestId 
                    const problemIndex = sol.problem.index
                    const obj = {contestId, problemIndex}
                    accepted[JSON.stringify(obj)] = 1 ;
                }
           })

/*            console.log(accepted) */

           for(let i = 0 ; i < result.length; i++){
                const contestId = result[i].contestId 
                const problemIndex = result[i].problem.index
                const obj = {contestId, problemIndex}
                result[i]['Ac'] =  accepted[JSON.stringify(obj)] === 1 ;
           }

           if(searchBy.verdict === "anyVerdict"){
               resolve({status, result})
           }
           else {
               resolve({status, result})
           }
       });
        
    });
};

module.exports = status