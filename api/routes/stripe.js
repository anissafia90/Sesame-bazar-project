const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Payment Route
router.post("/payment", async (req, res) => {
  try {
    const { tokenId, amount } = req.body;

    // Create a charge
    const charge = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: "usd",
    });

    res.status(200).json(charge);
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
