"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const LazyImage = ({ src, ...props }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const containerRef = useRef()

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.unobserve(containerRef.current)
				}
			},
			{ rootMargin: "0px" }
		)

		if (containerRef.current) {
			observer.observe(containerRef.current)
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current)
			}
		}
	}, [])

	return (
		<>
			<div ref={containerRef} className={cn(isLoaded ? "h-full" : "h-96", "w-full")}>
				<img
					src={isVisible ? src : "/blank.svg"}
					onLoad={() => setIsLoaded(true)}
					className={cn(isLoaded ? "visible" : "hidden", props.className)}
					{...props}
				/>
				{/* {!isLoaded && <div className="absolute top-0 left-0 w-full h-full bg-input" />} */}
			</div>
		</>
	)
}

export default LazyImage
