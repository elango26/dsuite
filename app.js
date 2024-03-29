// Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var middleware = require('./middleware/middleware');
var env = require('dotenv').config();
var fs = require('fs');
var http = require('http');
var https = require('https');

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
const expense = require('./routes/expense');
const damage = require('./routes/damage');
const payment = require('./routes/payments');
const order = require('./routes/order');
const deliveries = require('./routes/deliveries');
const personalize = require('./routes/personalize');
const printer = require('./routes/printer');
const dashboard = require('./routes/dashboard');
const ob = require('./routes/openingbalance');
const mtMngTrans = require('./routes/emptyTransaction');
const auth = require('./routes/auth');
const mScripts = require('./routes/manualScripts');
const test = require('./routes/test');

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
const port = env.parsed.PORT;
const prod_port = env.parsed.PROD_PORT;

// env
const environment = env.parsed.NODE_ENV;

// adding middleware -cors
app.use(cors());

// adding body parser
app.use(bodyparser.json());

// static file - assigning index file directory 
// automatically it will refer index.html file
app.use(express.static(path.join(__dirname,'public'))); 

//common no middleware
app.use('/api/auth',auth);
app.use('/api/test',test);
app.use('/api/scripts',mScripts);
app.use('/api/route',route);

//middleware
app.use(middleware.checkToken);

// adding router to app with initial path
app.use('/api/user',user);
app.use('/api/customer',customer);
app.use('/api/vendor',vendor);
app.use('/api/product',product);
//app.use('/api/route',route);
app.use('/api/ratemapping',ratemapping);
app.use('/api/rate',rate);
app.use('/api/sales',sales);
app.use('/api/purchase',purchase);
app.use('/api/discount',discount);
app.use('/api/employee',employee);
app.use('/api/leads',leads);
app.use('/api/reports',reports);
app.use('/api/expense',expense);
app.use('/api/damage',damage);
app.use('/api/payment',payment);
app.use('/api/order',order);
app.use('/api/deliveries',deliveries);
app.use('/api/personalize',personalize);
app.use('/api/printer',printer);
app.use('/api/dashboard',dashboard);
app.use('/api/ob',ob);
app.use('/api/grade',mtMngTrans);
// app.use('/api/auth',auth);
// app.use('/api/test',test);

// test server for home page
app.get('/',(req,res)=>{
    res.send('home page');
});

// assigning the port to application
// app.listen(port,()=>{
//     console.log('server started at port:'+port);
// });
if(environment == 'dev'){
    var httpServer = http.createServer(app);
    httpServer.listen(port,()=>{
        console.log('server started at port:'+port);
    });
}else{
    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/dsuite.webbehinds.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/dsuite.webbehinds.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/dsuite.webbehinds.com/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
    var httpServer = http.createServer(app);
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(prod_port,()=>{
        console.log('server started at port1:'+prod_port);
    });
    // httpServer.listen(port,()=>{
    //     console.log('server started at port2:'+port);
    // });
}


