const express = require('express');
const path = require('path')
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const { logErrors, errorHandler, clientErrorHandlers, wrapErrors } = require('./util/middlewares/errorsHandlers');
const isRequestAjaxOrApi = require('./util/isRequestAjaxOrApi');
const boom = require('boom');

const app = express();

app.use(express.json());
//static files
app.use("/static", express.static(path.join(__dirname, "public")));

//view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//routes
app.use('/products', productsRouter);
productsApiRouter(app);
app.use("/api/auth", authApiRouter)

//redirect
app.get('/', function (req, res) {
  res.redirect('/products');
});

app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound();
    res.status(statusCode).json(payload);
  }
  res.status(404).render('404')
});

app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandlers);
app.use(errorHandler);

const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`)
})
