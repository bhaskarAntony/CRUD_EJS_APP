const express = require('express')
require('dotenv').config() //config settings to access the variables of .env file

const cors = require('cors') //cross origin resourse sharing(to avoid cors effect) //cors effect is to blocking ports
const PORT = process.env.PORT || 3452 //accessing variables from .env file
//import database
const connectDatabase = require('./database/connect')
 
 
const app = express()

//view folder is static
app.use(express.static('./view'))

//template engines setting
app.set('view engine', 'ejs') //view engine is a keyword
app.set('views', './view') //views is a keyword

//middleware
app.use(express.urlencoded({extended : true})) //listening input data in the form of url
app.use(express.json()) //listening input data in the form of json

app.use(cors()) //enable the cors otherwise browsers will block the port http or https

//index route  
app.use(`/`, require('./route/user_route'))

//server call
app.listen(PORT, ()=>{
    connectDatabase(); //connecting database
    console.log(`server has been started @ https://shiny-fawn-pinafore.cyclic.cloud/:${PORT}`)
})
