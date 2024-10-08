const express=require('express');
const path=require('path');
const csrf=require('csurf');
const expressSession=require('express-session');

const db=require('./data/database');
const authRoutes=require('./routes/auth.routes');
const productRoutes=require('./routes/products.routes');
const baseRoutes=require('./routes/base.routes');
const createSessionConfig=require('./config/session');
const addCsrfTokenMiddleware=require('./middlewares/csrf-token');
const errorHandlerMiddleware=require('./middlewares/error-handler');
const cartMiddleware=require('./middlewares/cart');
const checkAuthStatusMiddleware=require('./middlewares/check-auth');
const protectRouteMiddleware=require('./middlewares/protect-routes');
const adminRoutes=require('./routes/admin.routes');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use('/product/assets',express.static('product-data'));
app.use(express.urlencoded({extended:false}));

const sessionConfig=createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(protectRouteMiddleware);
app.use('/admin',adminRoutes);
app.use(errorHandlerMiddleware);
db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
    console.log('Failed to connect to the database');
    console.log(error);
});
