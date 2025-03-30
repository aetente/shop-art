import { useShoppingCartContext } from '@/providers/ShoppinCartProvider';
import { getProducts } from '@/requests/products';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const itemsData = [
  {
    id: "test",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test1",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test2",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test3",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test4",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test5",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test6",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test7",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test8",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test9",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },
  {
    id: "test10",
    attributes: {
      price: 10,
      name: 'item',
      images: {
        data: [
          {
            attributes: {
              url: '/test/test_image1.jpg'
            }
          }
        ]
      }
    }
  },

]

function Items() {

  const fakeData = process.env.NEXT_PUBLIC_ENVIRONMENT !== "production";

  const router = useRouter()

  const { addItem, setShowCart } = useShoppingCartContext();

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([])

  const handleAddItem = (data: any) => {
    addItem(data);
    setShowCart(true);
  }

  const mapItems = (c: any, i: number) => {
    return (
      <div key={`item-${i}`} className='grid w-full relative pb-[100%]'>
        <div className='absolute top-0 left-0 bottom-0 right-0'>
          <p>{c.attributes.name}</p>
          <div
            className='relative w-full h-full min-w-[168px] min-h-[100%] mt-2 cursor-pointer'
            onClick={() => {
              // router.push('/item')
              handleAddItem(c);
            }}
          >
            <img
              src={fakeData ? c?.attributes?.images?.data[0]?.attributes?.url : process.env.NEXT_PUBLIC_STRIPE + c?.attributes?.images?.data[0]?.attributes?.url}
              alt={c.attributes.name}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const getProductsByCategory = async () => {
    try {
      console.log("getProductsByCategory", router.query.category)
      const productsData = await getProducts(router.query.category);
      console.log(productsData);
      setProducts(productsData.data)
      setIsLoading(false)
    } catch (e) {
      console.error('error getting products', e);
      setProducts(itemsData)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProductsByCategory()
  }, [])

  console.log('products', products)

  return (
    <div>
      {isLoading ? (<div>LOADING...</div>) :
        <div className='w-full grid grid-flow-column grid-cols-6 auto-rows-[1fr] auto-cols-[1fr] gap-x-4 gap-y-8'>
          {(products || []).map(mapItems)}
        </div >
      }
    </div>
  )
}

export default Items