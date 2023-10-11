const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose.connect(url,{
        dbName: "store-api"
    }).then(()=> {
        console.log('Database connected')
    })
}

module.exports = connectDB