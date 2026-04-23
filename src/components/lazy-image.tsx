"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

type LazyImageProps = {
  src: string
  className?: string
  alt?: string;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = "",
  className
}) => {
  
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      {
        threshold: 0,
        rootMargin: "10px 1px 2500px 1px",
      }
    );
    const el = containerRef.current 
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [])

	return (
		<>
      <div ref={containerRef} className={cn(isLoaded ? "h-full" : "h-96", "w-full")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isVisible ? src : "/blank.svg"}
          onLoad={() => setIsLoaded(true)}
          className={cn(isLoaded ? "visible" : "hidden", className)}
          alt={alt}
        />
      </div>
		</>
	)
}


export default LazyImage