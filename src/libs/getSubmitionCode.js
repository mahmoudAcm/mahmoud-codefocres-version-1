const request = require('request')
const cherio = require('cherio')

const getCode = (contestId, id) => {
     return new Promise((resolve, reject) => {
         const url = `https://codeforces.com/contest/${contestId}/submission/${id}`
         const config = {
             url,
             json:true
         }
         request(config, (err, res, body) => {
             const $ = cherio.load(body)
             resolve($("#program-source-text").text())
         })
     })
}

module.exports = getCode