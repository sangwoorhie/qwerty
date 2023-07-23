const express = require('express');
const session = require('express-session'); // Session
const app = express();
const port = 3000; // HTML, CSS

const path = require('path');

const cors = require('cors')
app.use(cors({ origin: true, credentials: true }));

// cookie parser
const cookieParser = require('cookie-parser');

const storeRouter = require('./routes/storeRoute.js'); 
const checkRouter = require('./routes/checkRoute.js'); 
const menuRouter = require('./routes/menuRoute.js'); 

const orderRouter = require('./routes/orderRoute.js'); 
const UsersRouter = require('./routes/usersRoute.js');
const UsersReviewRouter = require('./routes/usersReviewsRoute.js'); 
const cartRouter = require('./routes/cartRoute.js'); 

const customerRouter = require('./pages/customerPages.js');
const ceoRouter = require('./pages/ceoPages.js');

// Middleware
app.use(express.json()); // req.body parser
app.use(cookieParser()); // cookie parser
app.use(express.urlencoded({extended: false})); // URL-encoded 형식의 요청 본문 Parsing
app.use(
  session({
    secret: 'team_querty', // Session을 암호화하는데 사용되는 임의의 문자열
    resave: false,
    saveUninitialized: false,
  }),
);

// HTML 형태의 응답(response)을 반환하는 API
app.use(customerRouter, ceoRouter);

// localhost:3000/api/
app.use('/api', [storeRouter, checkRouter, menuRouter, orderRouter, UsersRouter, UsersReviewRouter, cartRouter]);

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'assets'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// server start
app.listen(port, () => {
  console.log(port, '포트가 열렸습니다~^^');
});
