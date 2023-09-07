const mongoose = require('mongoose')

const connectDatabase = async ()=>{
    await mongoose.connect("mongodb+srv://bhaskarAntoty123:bhaskar3958@bhaskarantony.wagpkay.mongodb.net/dbusers?retryWrites=true&w=majority")//variable form env file
    .then(res => {
        console.log('mongodb connected successfully')
    }).catch(err => console.log(err))
}
module.exports = connectDatabase