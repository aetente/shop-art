import { useEffect, useState } from "react"

const test = () => {

	const [count, setCount] = useState(0)

	useEffect(() => {
		return () => {
			console.log("component will unmount")
		}
	}, [count])

	const increaseCount = () => {
		setCount(count + 1)
	}

	return (
		<div className="pt-32">
			<button onClick={increaseCount}>+</button>
			{/* <div>{count}</div> */}
		</div>
	)
}

export default test