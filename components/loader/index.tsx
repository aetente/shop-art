function Loader () {
	return (
		<div className="relative w-16 h-8">
			<div className="absolute top-0 left-0 w-4 h-4 bg-black opacity-50 rounded-full animate-bounce" />
			<div className="absolute top-0 left-1/2 w-4 h-4 bg-black opacity-50 rounded-full animate-delay-100 animate-bounce" />
			<div className="absolute top-0 left-full w-4 h-4 bg-black opacity-50 rounded-full animate-delay-200 animate-bounce" />
		</div>
	)
}

export default Loader