const express = require('express');
const app = express();
const port = 3000

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const login = 'my_login'
const password = 'my_password'


app.post('/', (req, res)=>{
   
    let entered_password = req.body.password;
    let entered_login = req.body.login;

    if(entered_password == password && entered_login == login){
        res.send({
            status: 200,
            message: 'Login sucessfull!'
        })
    } else {
        res.send({
            status: 300,
            message: 'Login unsucessfull!'
        }) 
    }

})

app.listen(port, ()=>{
    console.log(`Example app running on port ${port}`)
})
