const express = require('express');
const path = require('path')
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');
const { logErrors, errorHandler, clientErrorHandlers } = require('./util/middlewares/errorsHandlers');

const app = express();

app.use(express.json());
//static files
app.use("/static", express.static(path.join(__dirname, "public")));

//view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//routes
app.use('/products', productsRouter);
app.use("/api/products", productsApiRouter);

//redirect
app.get('/', function (req, res) {
  res.redirect('/products');
})

app.use(logErrors);
app.use(clientErrorHandlers);
app.use(errorHandler);

const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`)
})
