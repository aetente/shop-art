import AboutMe from '@/components/about-me'
import Categories from '@/components/categories'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-24 max-w-7xl m-auto">
      <div className='flex items-center justify-between w-full'>

        <div className='flex items-center justify-between gap-2'>
          <div className="relative w-[32px] h-[32px]">
            <Image
              layout='fill'
              src="/icons/burger.png"
              alt='MENU'
            />
          </div>
          <p>MENU</p>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <div className="relative w-[32px] h-[32px]">
            <Image
              layout='fill'
              src="/icons/avatar_placeholder.png"
              alt='ACCOUNT'
            />
          </div>
          <p>ACCOUNT</p>
        </div>

      </div>

      <div className="relative w-full h-96 mt-10">
        <Image
          layout='fill'
          src="/test/test_image1.jpg"
          alt='ACCOUNT'
          style={{objectFit: 'cover'}}
        />
      </div>
      
      <div className="relative w-full mt-10">
        <Categories />
      </div>
      
      <div className="relative w-full mt-10">
        <AboutMe />
      </div>
    </main>
  )
}
