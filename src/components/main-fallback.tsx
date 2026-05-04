import React from "react";
import { Skeleton } from "./skeleton";

const MainFallback = () => {
	return (
		<>
			<div className="py-4 px-2 md:px-10">
				<Skeleton className="w-full h-[20vw] rounded-xl" />
			</div>
		</>
	);
};

export default MainFallback;
