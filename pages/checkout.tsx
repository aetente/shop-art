import Image from 'next/image'
import { PayPalButtons } from '@paypal/react-paypal-js'
import nookies, { destroyCookie } from 'nookies';
import { updateUser } from '@/requests/updateUser';
import { useShoppingCartContext } from '@/providers/ShoppinCartProvider';

function CheckoutPage() {

  const { cart, resetCart } = useShoppingCartContext();
  const total = cart.total;

  const cookies = nookies.get();
  const userId = cookies['userId'];

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
        
        addFileDownload();
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

        addFileDownload();
      })
      .catch((e) => {
        console.error("Approve error", e)
      });
  }

  const addFileDownload = () => {
        
    destroyCookie(undefined, 'cart');
    resetCart();  
		// TODO: replace item id with file download id
		let cartFileDownloads = cart.items
    const filesDownloadsString = localStorage.getItem("filesDownloads");
    const previousFileDownloads = filesDownloadsString ? JSON.parse(filesDownloadsString).filter((fd:any) => fd ? true : false) : [];
    cartFileDownloads = cartFileDownloads.map((fd:any) => {
      let fixedFD:any = {};
      fixedFD = fd.attributes.file_download.data.attributes;
      fixedFD.id = fd.attributes.file_download.data.id;
      fixedFD.file = fixedFD.file.data.map((fileData:any) => ({...fileData.attributes, id: fileData.id}));
      return fixedFD;
    })
    const cookies = nookies.get();
    const userId = cookies['userId'];
    if (userId && previousFileDownloads) {
			const newFileDownloads = [...previousFileDownloads, ...cartFileDownloads]
			localStorage.setItem("filesDownloads", JSON.stringify(newFileDownloads));
      const fileDownloadsIDs = newFileDownloads.map((nfd:any) => nfd.id);
      updateUser(userId, {
        file_downloads: fileDownloadsIDs
      });
    }
  }

  return (
		<div className='pt-24'>
			<div>TOTAL: ${total}</div>
      <PayPalButtons
        createOrder={() => createOrder(Math.round(total * 100) / 100)}
        onApprove={onApprove}
      />
      <button onClick={() => {
        addFileDownload()
      }}>test add file</button>
    </div>
  )
}

export default CheckoutPage