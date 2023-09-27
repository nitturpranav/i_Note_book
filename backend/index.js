const connectToMongo=require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

// Enable CORS for all routes


const app = express()
const port = 5000;
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  res.send('Hello World!')
})
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})