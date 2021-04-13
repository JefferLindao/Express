const express = require('express');
const path = require('path')
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');
const app = express();

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use('/products', productsRouter);

app.use("/api/products", productsApiRouter);


const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`)
})
