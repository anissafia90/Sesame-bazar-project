const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(updatedCart[1][0]); // updatedCart[1][0] contains the updated record
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const rowsDeleted = await Cart.destroy({ where: { id: req.params.id } });
    if (rowsDeleted) {
      res.status(200).json("Cart has been deleted...");
    } else {
      res.status(404).json("Cart not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json("Cart not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
