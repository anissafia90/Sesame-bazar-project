const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(updatedOrder[1][0]); // updatedOrder[1][0] contains the updated record
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const rowsDeleted = await Order.destroy({ where: { id: req.params.id } });
    if (rowsDeleted) {
      res.status(200).json("Order has been deleted...");
    } else {
      res.status(404).json("Order not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const incomeData = await Order.findAll({
      attributes: [
        [sequelize.fn("month", sequelize.col("createdAt")), "month"],
        [sequelize.fn("sum", sequelize.col("amount")), "total"],
      ],
      where: {
        createdAt: {
          [sequelize.Op.gte]: previousMonth,
        },
        ...(productId && {
          products: {
            [sequelize.Op.contains]: [{ productId: productId }],
          },
        }),
      },
      group: ["month"],
    });

    res.status(200).json(incomeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
