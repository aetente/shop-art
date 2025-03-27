import Image from 'next/image'
import { PayPalButtons } from '@paypal/react-paypal-js'
import nookies, { destroyCookie } from 'nookies';
import { updateUser } from '@/requests/updateUser';
import { useShoppingCartContext } from '@/providers/ShoppinCartProvider';
import { createBoughtItems } from '@/requests/createBoughtItems';
import { useEffect, useState } from 'react';

function CheckoutPage() {

  const { cart, resetCart } = useShoppingCartContext();

  const [purchaseStatus, setPurchaseStatus] = useState("idle");

  const total = cart.total;

  const cookies = nookies.get();
  const userId = cookies['userId'];

  useEffect(() => {console.log(userId)}, [])

  const createOrder = (price: number) => {
    return fetch("/api/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: "1",
            quantity: "1",
          },
        ],
        price
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        return order.id
      })
      .catch((e) => {
        console.error("Create Order error", e)
      });
  }

  const onApprove = (data: any) => {
    return fetch("/api/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
      .then((response) => response.json())
      .then((orderData) => {
        const name = orderData.payer.name.given_name;

        // doInvoice();

        addBoughtItem();
      })
      .catch((e) => {
        console.error("Approve error", e)
      });

  }

  const doInvoice = async () => {

    return fetch("/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((invoiceData) => {

        addBoughtItem();
      })
      .catch((e) => {
        console.error("Approve error", e)
      });
  }

  const addBoughtItem = async () => {

    // destroyCookie(undefined, 'cart');
    // resetCart();  

    // TODO: replace item id with file download id
    let cartItems = cart.items
    const boughtItemsString = localStorage.getItem("boughtItems");
    const previousBoughtItems = boughtItemsString ? JSON.parse(boughtItemsString).filter((fd: any) => fd ? true : false) : [];
    console.log("previousBoughtItems", previousBoughtItems)
    console.log("cart items before: ", cartItems)

    const cookies = nookies.get();
    const userId = cookies['userId'];

    let itemsToRemember: any[] = []

    cartItems = cartItems.map((ci: any, i: number) => {
      let fixedBoughtItem: any = {};
      let itemToRemember: any = {};
      let itemDate = (new Date()).toISOString()
      // fixedBoughtItem = ci.attributes.file_download.data.attributes;
      fixedBoughtItem.user = +userId;
      fixedBoughtItem.price = ci.attributes.price;
      itemToRemember.user = +userId
      itemToRemember.price = ci.attributes.price;

      fixedBoughtItem.date = itemDate;
      itemToRemember.date = itemDate;

      itemToRemember.file_download = {
        id: ci.attributes.file_download.data.id,
        file: ci.attributes.file_download.data.attributes.file.data.map((fileData: any) => ({ ...fileData.attributes, id: fileData.id }))
      };
      fixedBoughtItem["file-download"] = ci.attributes.file_download.data.id;

      fixedBoughtItem.status = "published";
      fixedBoughtItem.publishedAt = itemDate;

      itemsToRemember.push(itemToRemember);
      return fixedBoughtItem;
    })
    console.log("cart items after: ", cartItems)
    console.log("items to remember: ", itemsToRemember)

    console.log(userId)
    if (userId) {
      const newBoughtItems = [...previousBoughtItems, ...itemsToRemember]
      localStorage.setItem("boughtItems", JSON.stringify(newBoughtItems));

      let addedItems = false
      // TODO: the problem is with backend endpoint
      // I think it can't find user or file by id or both
      addedItems = await createBoughtItems({ data: cartItems });
      if (addedItems) {
        setPurchaseStatus("success")
      }
    }
  }

  return (
    <div className='pt-24'>
      {purchaseStatus === "success" ? <p>Purchase Successful</p> : (<>

        <div>TOTAL: ${total}</div>
        <PayPalButtons
          createOrder={() => createOrder(Math.round(total * 100) / 100)}
          onApprove={onApprove}
        />
        <button onClick={() => {
          addBoughtItem()
        }}>test add file</button>
      </>)}
    </div>
  )
}

export default CheckoutPage