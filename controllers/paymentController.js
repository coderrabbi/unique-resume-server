const stripe = require("stripe")(
  "sk_test_51M8SDWAdpdqyZqEI8qp8BeNGgnNjw53ozYEq95sRoZGRlB37xbeBKfcrAPoMO19kdR82ryYjyFC8MS65mEHafQtd00TN7zMGd8"
);

const checkoutSession = async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
};

const createCheckoutSession = async (req, res) => {
  const domainURL = "http://localhost:3000/checkout";
  const { priceId } = req.body;
  console.log(priceId);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
      // automatic_tax: { enabled: true }
    });
    res.send(session);
    // return res.redirect(303, session.url);
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      },
    });
  }
};

module.exports = { checkoutSession, createCheckoutSession };
