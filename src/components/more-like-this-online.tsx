"use client";
import { useEffect, useRef, useState } from "react";
import { SkeletonKomikMore } from "./skeleton-komik-online";
import { getRelated, relatedType } from "@/lib/nhapi";

const MoreLikeThisOnline = ({ id }: { id: number }) => {
	const [data, setData] = useState<relatedType[]>([]);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer: IntersectionObserver = new IntersectionObserver(
			([entry]: IntersectionObserverEntry[]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (containerRef.current) observer.unobserve(containerRef.current);
				}
			},
			{
				threshold: 0.1,
				rootMargin: "50px",
			},
		);
		const el = containerRef.current;
		if (el) {
			observer.observe(el);
		}

		return () => {
			if (el) observer.unobserve(el);
		};
	}, []);

	useEffect(() => {
		if (!isVisible) return;
		if (isVisible && isLoaded) return;
		const fetchData = async () => {
			const related = await getRelated(id);
			setData(related);
			console.log(related);
			setIsLoaded(true);
		};
		fetchData();
	}, [isVisible, isLoaded]);

	return (
		<>
			<div ref={containerRef} className="my-4 bg-border rounded p-4 flex flex-col">
				<h1 className="text-xl font-bold mb-6 text-center">More Like This</h1>
				<p>
					{isVisible ? "visible" : "not visible"} - {isLoaded ? "loaded" : "not loaded"}
				</p>
				<div className="my-4 grid grid-cols-5 gap-4">
					<SkeletonKomikMore />
				</div>
			</div>
		</>
	);
};

export default MoreLikeThisOnline;
