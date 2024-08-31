const express=require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./routes/routes'))
app.set('view engine','ejs')
app.use('/static',express.static('public'))

require('./db/connection')

app.listen(3000,()=>{
    console.log('App is running on PORT 3000')
})
