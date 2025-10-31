"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"

const AddPage = () => {
	const [inputValue, setInputValue] = useState("")
	const [responseMessage, setResponseMessage] = useState()
	const [isLoaded, setIsLoaded] = useState(false)
	const handleSubmit = async (e) => {
		setIsLoaded(true)
		e.preventDefault()
		try {
			const response = await fetch("/api/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url: inputValue }),
			})
			const data = await response.json()
			// console.log(data)
			// setResponseMessage(JSON.stringify(data, null, 2))
			setResponseMessage(data.message)
			setIsLoaded(false)
			setInputValue(``)
		} catch {
			setResponseMessage("Just Error")
			setIsLoaded(false)
		}
	}

	return (
		<>
			<div className="bg-foreground p-4 rounded">
				<form className="flex flex-col justify-center" onSubmit={handleSubmit}>
					<input
						className="peer border border-input text-sm rounded-md block w-full p-2.5 outline-2 text-background"
						placeholder="JSON DATA"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button
						className={cn(
							isLoaded ? `bg-dialect/50` : "bg-dialect cursor-pointer hover:bg-dialect/50 active:bg-dialect/50",
							"mt-8 px-8 py-2 rounded "
						)}
					>
						{isLoaded ? "Loading" : "Submit"}
					</button>
				</form>
				<div className="mt-8 bg-muted text-background p-4">{responseMessage && responseMessage}</div>
			</div>
		</>
	)
}

export default AddPage
