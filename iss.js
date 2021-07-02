const request = require("request");

  



const fetchMyIP = function(callback) {
    request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
        callback(err);
    }else if (response && response.statusCode !== 200) {
        callback(err);
        
    }else if (body) {
        const obj = JSON.parse(body)
        callback(null, obj.ip);
    }
    
})
    
  }



const fetchCoordsByIP = function(ip, callback) {
    request(`https://freegeoip.app/json/${ip}`, function(err, response, body) {
        if (err) {
            callback(err)
        }else if (response && response.statusCode !== 200) {
            callback(err)
        }else if (body) {
            const coordinate = JSON.parse(body)
            const obj = { lat: coordinate.latitude, lon: coordinate.longitude };
           
            callback(null, obj)
        }

    })
}

const fetchISSFlyOverTimes = function(coords, callback) {
    // let coords = { lat: coordinate.latitude, lon: coordinate.longitude }

    request(`http://api.open-notify.org/iss/v1/?lat=${coords.lat}&lon=${coords.lon}&alt=1650`, (err, response, body) => {
        if (err) {
            callback(err)
        } else if(response && response.statusCode !== 200) {
            callback(err)
        } else if (body) {
            const converting = JSON.parse(body).response
           
            const obj = { converting }

            callback(null, obj);
        }
        
    })


  };

  const nextISSTimesForMyLocation = function(callback) {

    fetchMyIP((error, body) => {
        if (error) {
            callback(error)
        }else {
            

            fetchCoordsByIP(body, (err, body) => {
                if (err){
                    callback(err)
                }else {
                    
                    
                    fetchISSFlyOverTimes(body, (err, body) => {
                        
                        if (err) {
                            callback(err)
                        }else {
                            callback(null, body)
                        }
                    })
                }
            })
        }

    })




    


    
  }
  



  module.exports = { 
      
      nextISSTimesForMyLocation
  
 };
  