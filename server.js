const express = require('express')
const connectDB = require('./config/db')
const app = express()
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
//connect database
connectDB()

//init middleware
app.use(express.json({ extended: false }))
//app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())
app.use(fileUpload()); 
app.get('/', (req,res) => res.send('API Running'))

//routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 6000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))