const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  { timestamps: true }
);

const OrderProduct = sequelize.define("OrderProduct", {
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Set up relationships
Order.hasMany(OrderProduct, { as: "products" });
OrderProduct.belongsTo(Order);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = { Order, OrderProduct };
