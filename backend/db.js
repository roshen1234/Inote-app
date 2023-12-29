const mongoose=require("mongoose");

const mongoURI="mongodb://127.0.0.1:27017/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    const conn=mongoose.connection
    conn.once('open',()=>{
      console.log('successfullly connected to database')
    })
    conn.once('error',(error)=>{
        console.log(`failed to connected to database${error.message}`)
      })
}
module.exports=connectToMongo;

