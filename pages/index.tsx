import AboutMe from '@/components/about-me'
import Categories from '@/components/categories'
import Loader from '@/components/loader'
import SubHeader from '@/components/sub-header'
import { getCategories } from '@/requests/categories'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);

  const fetchCategories = async () => {
    setCategories(await getCategories());
    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 pb-24">
      
      {/* <SubHeader /> */}

      <div className="relative w-screen min-h-[600px] h-96">
        <Image
          layout='fill'
          src="/test/test_image1.jpg"
          alt='ACCOUNT'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="relative w-full mt-10 max-w-[1228px] top-[-96px] bg-white p-8 pt-4">
        {loading ? (<div className='w-full flex justify-center align-middle'><Loader /></div>) : (
          <Categories categoriesData={categories?.data} />
        )}
        <div className="relative w-full mt-20">
          <AboutMe />
        </div>
      </div>


    </main>
  )
}
