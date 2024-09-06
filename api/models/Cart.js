const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define("Cart", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const CartProduct = sequelize.define("CartProduct", {
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
Cart.hasMany(CartProduct, { as: "products" });
CartProduct.belongsTo(Cart);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = { Cart, CartProduct };
