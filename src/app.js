const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectory = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Piyush Bajaj'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Piyush Bajaj'
    })
})

app.get('/products',(req,res)=>{
    
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'If you want help kindly contact @smrtdvlpr on instagram'
    })
})


app.get('/weather',(req,res)=>{
    const location = req.query.address
    if(!req.query.address){
        return res.send({
            error:'Please provide a valid location'
        })
    }
    geocode(location,(error,{latitude,longitude,location}={}) =>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            return res.send({
                location,
                forecast:forecastData
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error 404',
        error_msg:'Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'Error 404',
        error_msg:'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000!')
})
