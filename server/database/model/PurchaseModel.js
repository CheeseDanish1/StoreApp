const mongoose = require("mongoose");

const PurchaseConfig = new mongoose.Schema(
  {
    uuid: String,
    items: [
      {
        name: String,
        id: String,
        price: String,
        amount: Number,
        category: String,
      }
    ],
    buyer: {
      name: String,
      email: String,
      grade: String,
    },
    timeCreated: Date,  
    totalCost: String
  },
  { collection: "Purchases", typeKey: "$type" }
);

module.exports = mongoose.model("Purchase", PurchaseConfig);