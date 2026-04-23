import { Skeleton } from "./skeleton"

const SkeletonKomik = () => {
  const data: Array<number> = [...Array(12).keys()]  
  return (
    <>
      {data.map((e) => (
        <div key={e} className="group">
					<Skeleton className="w-full h-[40vw] rounded-xl md:h-[20vw]" />
					<Skeleton className="h-6 w-full mt-3" />
				</div>
      ))}
    </>
  )
}

export default SkeletonKomik