const mongoose = require('mongoose');
var cors = require('cors');
require('./models/User');
require('./models/Room');
const { initialSeedDB } = require('./Utils/helpers');
const roomRoutes = require('./routes/room');
const userRoutes = require('./routes/user');
require('dotenv').config();

//Connect DB
mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('connected to mongodb');
});

//Create Express Instance
const express = require('express');
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Allow same orign policy
app.options('*', cors()); // include before other routes
app.use(cors());
const server = require('http').createServer(app);

//Create socket.io handler
require('./socketHandler')(server);

//Express routing functions

app.get('/', (req, res) => {
    //initialSeedDB();
    res.send('Hello world');
});

app.use('/user', userRoutes);
app.use('/room', roomRoutes);

const port = process.env.PORT || 8080;
// make the server listen to requests
server.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
});
