import { useShoppingCartContext } from '@/providers/ShoppinCartProvider';
import Image from 'next/image'
import { useRouter } from 'next/router'
import Cart from '../cart';
import { useUserContext } from '@/providers/UserProvider';

function Header() {

	const router = useRouter()

	const { setShowCart } = useShoppingCartContext();

	const { isLoggedIn } = useUserContext()

	return (
		<div className='flex items-center justify-between pr-24 pl-24 fixed w-full h-20 bg-[#eeeeee] z-30 left-0'>
			<div className='flex items-center justify-between w-full max-w-7xl m-auto'>
				<div className='relative w-[128px] h-[64px] cursor-pointer'
					onClick={() => {
						router.push('/')
					}}
				>
					<Image
						layout='fill'
						src='/images/logo-test2.png'
						alt='logo'
					/>
				</div>

				<div className='relative'>
					<input className='relative bg-[#262626] rounded-[100px] w-[400px] text-[#bdbdbd] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-[1px_solid_#000000] font-openSans text-xs px-5 py-2' placeholder='Search...' />
					<div className='absolute top-2 right-0 bg-no-repeat bg-[url("/icons/search.svg")] w-[32px] h-[32px] z-50'></div>
				</div>


				<div className='flex items-center justify-between gap-2 font-sansCondensedBold text-[#1d1d1d]'>
					<div className='cursor-pointer font-sansCondensedBold'
						onClick={() => {
							router.push('/items')
						}}
					>PRODUCTS</div>
					<div className='cursor-pointer font-sansCondensedBold'>CONTACT</div>
					<div
						className='cursor-pointer text-[#E31D27] font-sansCondensedBold'
						onClick={() => {
							router.push('/login')
						}}
					>{isLoggedIn ? "MY ACCOUNT" : "LOG IN"}</div>
				</div>
			</div>
		</div>
	)
}

export default Header

/*

box-sizing: border-box;

position: absolute;
left: 35.42%;
right: 36.81%;
top: 33.33%;
bottom: 34.29%;

background: #262626;
border: 1px solid #000000;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 100px;


*/