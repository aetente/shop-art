import Image from "next/image"

function Header() {
  return (
    <div className='pr-24 pl-24 fixed w-full h-20 bg-slate-200 z-30 left-0'>
      <div className='flex items-center justify-between w-full max-w-7xl m-auto'>
        <div className="relative w-[128px] h-[64px]">
          <Image
            layout='fill'
            src="/images/logo.png"
            alt='logo'
          />
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div className="relative w-[32px] h-[32px]">
            <Image
              layout='fill'
              src="/icons/search.png"
              alt='search'
            />
          </div>
          <div className="relative w-[32px] h-[32px]">
            <Image
              layout='fill'
              src="/icons/cart.png"
              alt='cart'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header