const {
  NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  NEXT_PUBLIC_PAYPAL_SECRET
} = process.env;

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

// capture payment & store order information or fullfill order
export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { orderID } = req.body;
    const captureData = await capturePayment(orderID);
    // TODO: store payment information such as the transaction ID
    res.json(captureData);
  } else {
    // Handle any other HTTP method
  }
}

// generate an access token using client id and app secret
async function generateAccessToken() {
  const auth = Buffer.from(NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + NEXT_PUBLIC_PAYPAL_SECRET).toString("base64")
  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

// use the orders api to capture payment for an order
async function capturePayment(orderId:any) {
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}