function Menu(props: any) {

  return (
    <>
      <div onClick={() => {
        props?.onClose && props?.onClose()
      }} className='fixed z-40 bg-black opacity-30 top-0 left-0 bottom-0 right-0' />
      <div className='fixed z-50 h-screen w-56 top-0 left-0 bottom-0 right-0 bg-slate-300 p-4'>
        <div className='text-xl cursor-pointer'>
          Menu
        </div>
        <div className='text-xl mt-2 cursor-pointer'>
          Home
        </div>
        <div className='text-xl mt-2 cursor-pointer'>
          Categories
        </div>
        
        <div className='text-xl mt-2 cursor-pointer'>
          Contact us
        </div>
        
        <div className='text-xl mt-2 cursor-pointer'>
          About us
        </div>
      </div>
    </>
  )
}

export default Menu