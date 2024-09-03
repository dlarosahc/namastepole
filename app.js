require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const packagesRouter = require('./controllers/packages');
const { userExtractor } = require('./middleware/auth');
const paymentsRouter = require('./controllers/payments');
const profileRouter = require('./controllers/profile');
const scheduleRouter = require('./controllers/schedule');
const classRouter = require('./controllers/class');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');


(async() => {
     try{
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB');
     } catch(error){
        console.log(error);
     }
} )();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas Frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/aboutus', express.static(path.resolve('views', 'us')));
app.use('/prices', express.static(path.resolve('views', 'prices')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/dashboard', express.static(path.resolve('views', 'dashboard')));
app.use('/dashboard/package', express.static(path.resolve('views', 'dashboard', 'package')));
app.use('/dashboard/payment', express.static(path.resolve('views', 'dashboard', 'payment')));
app.use('/dashboard/attendance', express.static(path.resolve('views', 'dashboard', 'attendance')));
app.use('/dashboard/schedule', express.static(path.resolve('views', 'dashboard', 'schedule')));

app.use(morgan('tiny'));

//Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/packages', userExtractor, packagesRouter);
app.use('/api/payments', userExtractor ,paymentsRouter);
app.use('/api/profile', userExtractor ,profileRouter);
app.use('/api/schedule', userExtractor , scheduleRouter);
app.use('/api/class', userExtractor , classRouter);


module.exports = app;

