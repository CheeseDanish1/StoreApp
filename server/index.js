// npm run build in QRClient
// Paste contents to /views

require("dotenv").config();
require("./database/connection");

const { v4: uuidv4 } = require('uuid')
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const app = express();
const http = require("http").Server(app);
const PORT = process.env.PORT || 3001;
const PurchaseModel = require('./database/model/PurchaseModel');

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ success: true });
})

app.post("/save", async (req, res) => {
  const { personSearch, cart, paymentMethod } = req.body;

  const totalCost = computeTotalCost(cart);

  console.log({ personSearch, cart, paymentMethod })
  let r = await PurchaseModel.create({
    timeCreated: new Date, totalCost, uuid: uuidv4(), buyer: {
      name: personSearch.name, email: personSearch.email, grade: personSearch.grade
    }, items: cart.map((item) => {
      return { name: item.name, id: item.id, price: item.price, amount: item.amount, category: item.category }
    })
  })

  res.send({success: true, purchaseModel: r})

})

function computeTotalCost(cart) {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let priceWithoutDollarSign = item.price.slice(1, item.price.length);
    sum += parseInt(item.amount) * priceWithoutDollarSign;
  }

  return USDollar.format(sum);
}


http.listen(PORT, () => console.log(`Running on ${PORT}`));