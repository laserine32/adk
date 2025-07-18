"use client"

const ListLazyImage = ({ images }) => {
	return (
		<>
			{images.map((e, i) => (
				<img key={i} className="w-full h-full mb-1" src="/blank.svg" data-src={e} alt={`${i} - ${e}`} />
			))}
		</>
	)
}

const Limage = ({ src, alt, isView }) => {}

export default ListLazyImage
