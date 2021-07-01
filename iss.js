const request = require("request")

  



const fetchMyIP = function(callback) {
    request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
        callback(err)
    }else if (response && response.statusCode !== 200) {
        callback(err)
    }else if (body) {
        callback(null, body)
    }
    
})
    
  }
  

  module.exports = { fetchMyIP };
  