const express = require('express')
const cors = require('cors') 
const os = require('os');
const usersRouter = require('./routes/userRoutes');
const rolesRouter = require('./routes/roleRoutes');
const dotenv = require('dotenv');
const { authenticateToken } = require('./utils/authUtil');
require('./db/conn')

dotenv.config();
// Set up the express app
const app = express()
const port = process.env.PORT || 5000

// Allows us to accept the data in JSON format
app.use(cors());
app.use(express.json());

app.use('/users',authenticateToken,usersRouter);
app.use('/roles',authenticateToken,rolesRouter);

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/check', (req, res) => {
    //console.log(`Request handled by ${os.hostname()}`);
    res.send(req.body)
})

app.get('/check-host', (req, res) => {
    //console.log(`Request handled by ${os.hostname()}`);
    res.send(`Request handled by ${os.hostname()}`)
})


try {
    // Start the web server on the specified port.
    app.listen(port, () => {
       console.log(`Server is running at: http://localhost:${port}`);
    });
} catch (error) {
    console.error("Unable to connect to the database:", error.original);
}