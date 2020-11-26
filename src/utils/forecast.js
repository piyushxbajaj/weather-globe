const request = require('postman-request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=7936de1c5a400d81f7cdaf1b8f43ca2d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    // console.log(url)
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to Connect to weather service',undefined)
        }
        else if (body.error){
            callback('Unable to find location',undefined)
        }
        else{
            console.log(body.current)
            callback(undefined,body.current.weather_descriptions[0]+'. It currently is '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. UV index is '+body.current.uv_index)
            
            
        }
    })
}
module.exports = forecast
// description:response.body.current.weather_descriptions[0],
                // temperature:response.body.current.temperature,
                // feelslike:response.body.current.feelslike
