import Image from 'next/image'
import { PayPalButtons } from '@paypal/react-paypal-js'
import nookies from 'nookies';
import { updateUser } from '@/requests/updateUser';

function Item() {


  const cookies = nookies.get();
  const userId = cookies['userId'];

  const createOrder = () => {
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
        addFileDownload();
      })
      .catch((e) => {
        console.error("Approve error", e)
      });

  }

  const addFileDownload = () => {
    const boughtItemsString = localStorage.getItem("boughtItems");
    const previousBoughtItems = boughtItemsString ? JSON.parse(boughtItemsString)?.map((fd: any) => fd.id) : [];
    const cookies = nookies.get();
    const userId = cookies['userId'];
    if (userId && previousBoughtItems) {
      updateUser(userId, {
        bought_items: [...previousBoughtItems, 1]
      });
    }
  }

  return (
    <div className='w-full pt-24'>
      <div className='flex gap-4 w-full'>

        <div className='flex-[1] flex gap-4 max-h-[346px]'>
          <div className='relative w-16 h-full overflow-y-auto flex flex-col gap-4'>

            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
            <div className='relative min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] w-[64px] h-[64px]'>
              <Image
                layout='fill'
                src='/test/test_image1.jpg'
                alt='item'
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  // height: 'auto'
                }}
              />
            </div>
          </div>
          <div className='relative w-[calc(100%-4rem)] h-full'>
            <Image
              layout='fill'
              src='/test/test_image1.jpg'
              alt='item'
              style={{
                objectFit: 'cover',
                // width: '100%',
                // height: 'auto'
              }}
            />
          </div>
        </div>
        <div className='flex-[1]'>
          <div>File name</div>
          <div>$2.00</div>
        </div>
        <div className='flex-[1]'>
          <div>Description</div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
        </div>
      </div>
      <hr className='w-full border-solid border-[1px] border-black mt-2' />
      <div>
        You might also like
      </div>
      <div className='flex gap-4 overflow-y-auto mt-4'>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>

        <div className='relative min-w-[168px] min-h-[168px]'>
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>
      </div>
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

export default Item