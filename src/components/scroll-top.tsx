"use client"
import { ChevronUpIcon } from "@heroicons/react/16/solid"

const ScrollTop = () => {
  const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}
	return (
		<>
			<div className="hidden md:block">
				<div
					className="fixed bottom-10 right-4 cursor-pointer bg-input p-2 text-white rounded-full"
					onClick={scrollToTop}
				>
					<ChevronUpIcon className="size-6" />
				</div>
			</div>
		</>
	)
}

export default ScrollTop