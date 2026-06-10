import { Skeleton } from "./skeleton";

export const SkeletonKomikOnline = () => {
	const data: Array<number> = [...Array(12).keys()];
	return (
		<>
			<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
				{data.map((e) => (
					<div key={e} className="group">
						<Skeleton className="w-full h-[40vw] rounded-xl md:h-[20vw]" />
						<Skeleton className="h-6 w-full mt-3" />
					</div>
				))}
			</div>
		</>
	);
};

export const SkeletonKomikMore = () => {
	const data: Array<number> = [...Array(5).keys()];
	return (
		<>
			{data.map((e) => (
				<div key={e} className="group">
					<Skeleton className="w-full h-[40vw] rounded-xl md:h-[20vw]" />
					<Skeleton className="h-6 w-full mt-3" />
				</div>
			))}
		</>
	);
};
