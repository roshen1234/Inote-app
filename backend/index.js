const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')
connectToMongo()



const app = express()
const port = 5000

// const corsOptions = {
//   origin: 'http://localhost:3000/', // Replace with your frontend domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: ["GET","POST","DELETE","PUT"],
}));

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})

