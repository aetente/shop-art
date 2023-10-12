import Image from 'next/image'
import { PayPalButtons } from '@paypal/react-paypal-js'
import nookies from 'nookies';
import { updateUser } from '@/requests/updateUser';
import { useShoppingCartContext } from '@/providers/ShoppinCartProvider';

function CheckoutPage() {

  const { cart } = useShoppingCartContext();
  const total = cart.total;

  const cookies = nookies.get();
  const userId = cookies['userId'];
  console.log('userId', userId)
	console.log('cart', cart)

  const createOrder = () => {
    console.log("createOrder")
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
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id)
      .catch((e) => {
        console.error("Create Order error", e)
      });
  }

  const onApprove = (data: any) => {
    console.log("onApprove")
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
        console.log(`Transaction completed by ${name}`);
        addFileDownload();
      })
      .catch((e) => {
        console.error("Approve error", e)
      });

  }

  const addFileDownload = () => {
    console.log("addFileDownload")
		// TODO: replace item id with file download id
		const cartFileDownloads = cart.items.map((item: any) => (item.id + 1))
    const filesDownloadsString = localStorage.getItem("filesDownloads");
    const previousFileDownloads = filesDownloadsString ? JSON.parse(filesDownloadsString)?.map((fd: any) => fd.id) : [];
    const cookies = nookies.get();
    const userId = cookies['userId'];
    if (userId && previousFileDownloads) {
			const newFileDownloads = [...previousFileDownloads, ...cartFileDownloads]
			localStorage.setItem("filesDownloads", JSON.stringify(newFileDownloads));
      updateUser(userId, {
        file_downloads: newFileDownloads
      });
    }
  }

  return (
		<div className='pt-24'>
			<div>TOTAL: ${total}</div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
      <button onClick={() => {
        addFileDownload()
      }}>test add file</button>
    </div>
  )
}

export default CheckoutPage