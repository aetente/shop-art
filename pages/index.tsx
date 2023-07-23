import AboutMe from '@/components/about-me'
import Categories from '@/components/categories'
import Menu from '@/components/menu'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {

  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-24">
      <div className='flex items-center justify-between w-full'>

        <div>
          <div
            className='relative flex items-center justify-between gap-2 cursor-pointer'
            onClick={() => {
              setOpenMenu(!openMenu)
            }}
          >
            <div className="relative w-[32px] h-[32px]">
              <Image
                layout='fill'
                src="/icons/burger.png"
                alt='MENU'
              />
            </div>
            <p>MENU</p>
          </div>
          {openMenu ? <Menu onClose={() => {
              setOpenMenu(false)
            }} /> : <></>}
        </div>

        <div
          className='flex items-center justify-between gap-2 cursor-pointer'
          onClick={() => {
            router.push('/login')
          }}
        >
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
          style={{ objectFit: 'cover' }}
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
