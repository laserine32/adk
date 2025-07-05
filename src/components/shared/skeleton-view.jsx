import React from "react"
import { Skeleton } from "./skeleton"

const SkeletonView = () => {
	return (
		<>
			<div className="my-4 grid grid-cols-2 gap-4 bg-border rounded p-4">
				<div className="flex items-center justify-center">
					<Skeleton className={"w-3xs h-96"} />
				</div>
				<div>
					<Skeleton className={"w-full h-5 mb-2"} />
					<Skeleton className={"w-5/6 h-5 mb-2"} />
					<Skeleton className={"w-4/6 h-5 mb-2"} />
					<Skeleton className={"w-5/6 h-5 my-6"} />
					<div className="my-4 flex gap-2">
						<Skeleton className={"w-10 h-5"} />
						<Skeleton className={"w-10 h-5"} />
						<Skeleton className={"w-10 h-5"} />
						<Skeleton className={"w-10 h-5"} />
					</div>
				</div>
			</div>
			<Skeleton className={"w-full h-screen"} />
			<Skeleton className={"w-full h-screen"} />
		</>
	)
}

export default SkeletonView
