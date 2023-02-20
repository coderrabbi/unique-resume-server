const stripe = require("stripe")(
  "sk_test_51M8SDWAdpdqyZqEI8qp8BeNGgnNjw53ozYEq95sRoZGRlB37xbeBKfcrAPoMO19kdR82ryYjyFC8MS65mEHafQtd00TN7zMGd8"
);

const checkoutSession = async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
};

const createCheckoutSession = async (req, res) => {
  const domainURL = "https://unique-resume.vercel.app/checkout";
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

const createCustomer = async (req, res) => {
  const { name, email } = req.body;

  res.send(customer);
};

const createSub = async (req, res) => {
  const { priceId, name, email } = req.body;
  const customer = await stripe.customers.create({
    name: name,
    email: email,
    // payment_settings: {
    //   payment_method_types: ["card", "ach_credit_transfer", "paper_check"],
    // },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_settings: {
      payment_method_types: ["card"],
    },
    expand: ["latest_invoice.payment_intent"],
  });

  // return the client secret and subscription id
  res.send(subscription);
};

module.exports = {
  checkoutSession,
  createCheckoutSession,
  createCustomer,
  createSub,
};
