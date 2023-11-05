const {
  NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  NEXT_PUBLIC_PAYPAL_SECRET
} = process.env;

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

const TEMPLATE_INVOICE = {
  "detail":{
    //  "invoice_number":"#0",
    //  "reference":"deal-ref",
    //  "invoice_date":"2018-11-12",
     "currency_code":"USD",
     "note":"Thank you for your business.",
     "term":"No refunds",
     "memo":"memo",
    //  "payment_term":{
    //     "term_type":"NET_10",
    //     "due_date":"2018-11-22"
    //  }
  },
  "invoicer":{
    //  "name":{
    //     "given_name":"Yehoshua",
    //     "surname":"Kopirin"
    //  },
    //  "address":{
    //     "address_line_1":"1234 First Street",
    //     "address_line_2":"337673 Hillside Court",
    //     "admin_area_2":"Anytown",
    //     "admin_area_1":"CA",
    //     "postal_code":"98765",
    //     "country_code":"US"
    //  },
     "email_address":"aetente@gmail.com",
    //  "phones":[
    //     {
    //        "country_code":"001",
    //        "national_number":"4085551234",
    //        "phone_type":"MOBILE"
    //     }
    //  ],
    //  "website":"www.test.com",
    //  "tax_id":"ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy- Jb5SeuGj185MNNw6g",
    //  "logo_url":"https://example.com/logo.PNG",
    //  "additional_notes":"2-4"
  },
  "primary_recipients":[
     {
        "billing_info":{
          //  "name":{
          //     "given_name":"Stephanie",
          //     "surname":"Meyers"
          //  },
          //  "address":{
          //     "address_line_1":"1234 Main Street",
          //     "admin_area_2":"Anytown",
          //     "admin_area_1":"CA",
          //     "postal_code":"98765",
          //     "country_code":"US"
          //  },
           "email_address":"aetente@gmail.com",
          //  "phones":[
          //     {
          //        "country_code":"001",
          //        "national_number":"4884551234",
          //        "phone_type":"HOME"
          //     }
          //  ],
          //  "additional_info_value":"add-info"
        },
        // "shipping_info":{
        //    "name":{
        //       "given_name":"Stephanie",
        //       "surname":"Meyers"
        //    },
        //    "address":{
        //       "address_line_1":"1234 Main Street",
        //       "admin_area_2":"Anytown",
        //       "admin_area_1":"CA",
        //       "postal_code":"98765",
        //       "country_code":"US"
        //    }
        // }
     }
  ],
  "items":[
     {
        "name":"SVG image",
        "description":"SVG image",
        "quantity":"1",
        "unit_amount":{
           "currency_code":"USD",
           "value":"50.00"
        },
        "tax":{
           "name":"Sales Tax",
           "percent":"7.25"
        },
        "discount":{
           "percent":"5"
        },
        "unit_of_measure":"QUANTITY"
     }
  ],
  // "configuration":{
  //    "partial_payment":{
  //       "allow_partial_payment":true,
  //       "minimum_amount_due":{
  //          "currency_code":"USD",
  //          "value":"20.00"
  //       }
  //    },
  //    "allow_tip":true,
  //    "tax_calculated_after_discount":true,
  //    "tax_inclusive":false,
  //    "template_id":"TEMP-19V05281TU309413B"
  // },
  // "amount":{
  //    "breakdown":{
  //       "custom":{
  //          "label":"Packing Charges",
  //          "amount":{
  //             "currency_code":"USD",
  //             "value":"10.00"
  //          }
  //       },
  //       "shipping":{
  //          "amount":{
  //             "currency_code":"USD",
  //             "value":"10.00"
  //          },
  //          "tax":{
  //             "name":"Sales Tax",
  //             "percent":"7.25"
  //          }
  //       },
  //       "discount":{
  //          "invoice_discount":{
  //             "percent":"5"
  //          }
  //       }
  //    }
  // }
}


// capture payment & store order information or fullfill order
export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { orderID } = req.body;
    const invoiceData = await doInvoice();
		console.log("invoiceData", invoiceData)
    res.json(invoiceData);
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
async function doInvoice() {
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/invoicing/invoices`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
			'Prefer': 'return=representation'
    },
		body: JSON.stringify(TEMPLATE_INVOICE)
  });
  const data = await response.json();

	
  const sendInvoiceResponse = await fetch(`/v2/invoicing/invoices/${data.id}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
			'PayPal-Request-Id': 'b1d1f06c7246c'
    },
		body: JSON.stringify({ "send_to_invoicer": true })
  });
  const sendInvoicData = await sendInvoiceResponse.json();



  return sendInvoicData;
  // return data
}