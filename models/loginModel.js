const fs = require("fs")
function checkLogin(req){
    return req.session.islogin
}

async function login(email, pass){
    return new Promise((resolve, reject) =>{
        const datafile = "./data/admin.json"
        fs.readFile(datafile, 'utf8', (err, data) =>{
            if(err){
                reject([err,null, null]);
            }else{
                const dataJson = JSON.parse(data)
                if(dataJson.email === email && dataJson.password === pass){
                    resolve([err,true, dataJson.username])
                }else{
                    resolve([err,false, null])
                }
            }
        })
    })
    
}

module.exports = [checkLogin, login]