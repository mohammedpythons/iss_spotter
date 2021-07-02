

const { fetchMyIP  ,fetchCoordsByIP,    fetchISSFlyOverTimes, nextISSTimesForMyLocation  } = require('./iss');






nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
     console.log("It didn't work!", error);

    
  
  }
  // console.log(passTimes.converting)
  for (item of passTimes.converting) {
    console.log(`${Date(item.risetime)} for ${item.duration} seconds`)
}
  // success, print out the deets!
  
})

