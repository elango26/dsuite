// Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

// assigning express to app variable
var app = express();

const user = require('./routes/user');
const product = require('./routes/product');
const route = require('./routes/route');
const rate = require('./routes/rate');
const ratemapping = require('./routes/ratemappingtocustomer');
const customer = require('./routes/customer');
const vendor = require('./routes/vendor');
const sales = require('./routes/sales');
const purchase = require('./routes/purchase');
const discount = require('./routes/discount');
const employee = require('./routes/employee');
const leads = require('./routes/leads');
const reports = require('./routes/reports');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/dsuite');

// on mongodb connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb database @ 27017');
});

mongoose.connection.on('error',(error)=>{
    if(error){
        console.log('Error in database connection:'+error);
    }
});


// port no
const port = 3000;

// adding middleware -cors
app.use(cors());

// adding body parser
app.use(bodyparser.json());

// static file - assigning index file directory 
// automatically it will refer index.html file
app.use(express.static(path.join(__dirname,'public'))); 

// adding router to app with initial path
app.use('/api/user',user);
app.use('/api/customer',customer);
app.use('/api/vendor',vendor);
app.use('/api/product',product);
app.use('/api/route',route);
app.use('/api/ratemapping',ratemapping);
app.use('/api/rate',rate);
app.use('/api/sales',sales);
app.use('/api/purchase',purchase);
app.use('/api/discount',discount);
app.use('/api/employee',employee);
app.use('/api/leads',leads);
app.use('/api/reports',reports);

// test server for home page
app.get('/',(req,res)=>{
    res.send('home page');
});

// assigning the port to application
app.listen(port,()=>{
    console.log('server started at port:'+port);
});

