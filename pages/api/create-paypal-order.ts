const {
  NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  NEXT_PUBLIC_PAYPAL_SECRET
} = process.env;

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

// create a new order
export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    console.log(req.body)
    const order = await createOrder(req.body.price);
    res.json(order);
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

async function createOrder(price: number) {
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: String(price),
          },
        },
      ],
    }),
  });
  const data = await response.json();
  return data;
}