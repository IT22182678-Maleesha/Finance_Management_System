// Importing Required Modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//import routers
const authRouter = require('./routers/authRouter');
const bookingRouter = require('./routers/bookingRouter');
const vehicleRouter = require('./routers/vehicleRouter');
const categoryRouter = require('./routers/categoryRouter');

// Middleware
const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database Connected")
}).catch(err => {
    console.log(err);
});

app.use('/api/auth', authRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/vehicle', vehicleRouter);
app.use('/api/category', categoryRouter);

app.get('/',(req,res)=>{
    res.json({message:"Hello, from server"});
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});