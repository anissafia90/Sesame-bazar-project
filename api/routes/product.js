const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updated) {
      const updatedProduct = await Product.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const rowsDeleted = await Product.destroy({ where: { id: req.params.id } });
    if (rowsDeleted) {
      res.status(200).json("Product has been deleted...");
    } else {
      res.status(404).json("Product not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.findAll({
        order: [["createdAt", "DESC"]],
        limit: 1,
      });
    } else if (qCategory) {
      products = await Product.findAll({
        where: {
          categories: {
            [Op.contains]: [qCategory],
          },
        },
      });
    } else {
      products = await Product.findAll();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
