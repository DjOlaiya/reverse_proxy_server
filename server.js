const express = require('express');
const app = express();
const axios = require('axios')
const cors = require('cors')
const util = require('./test')
require('dotenv').config()


app.use(cors({
    origin:'*'
}))
// ':endpoint([\\/\\w\\.-]*)'
// '/facilityschedules'
app.get(':endpoint([\\/\\w\\.-]*)', function(req, res){
    let a_url = 'https://date.nager.at/api/v2/publicholidays/2022/AT'
    // const signature = util.createSignature(process.env.API_KEY,process.env.SECRET);
    // const api_url = util.formatUrl(process.env.API_KEY,req.originalUrl,signature,'19,20')
    // all the secrets are coming from the req.query
    const api_url = process.env.BASE_URL + req.params.endpoint
    console.log(api_url)
    console.log(req.params)
    let params ={}
    for(const [field,val] of Object.entries(req.query)){
        params[field]=val
    }
    console.log(params)
       axios.get(api_url,{params:params}).then( response => {
      res.json(response.data)  
    }).catch(error => {
        res.json(error)
    })
});


// // '/facilityschedules'
// // ':endpoint([\\/\\w\\.-]*)'
app.listen(process.env.PORT)