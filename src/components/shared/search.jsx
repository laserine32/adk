"use client"
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const Search = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", "1")
		if (term) {
			params.set("query", term)
		} else {
			params.delete("query")
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<>
			<form className="flex bg-zinc-800 border border-zinc-700 text-white rounded-md shadow text-sm">
				<div aria-disabled="true" className="w-10 grid place-content-center">
					<MagnifyingGlassIcon className="w-4 h-4 text-white" />
				</div>
				<input
					type="text"
					spellCheck="false"
					name="text"
					className="bg-transparent py-1.5 outline-none placeholder:text-zinc-400 w-20 focus:w-48 transition-all"
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams.get("query")?.toString()}
				/>
				<button className="w-10 grid place-content-center" aria-label="Clear input button" type="reset">
					<XMarkIcon className="w-4 h-4 text-white" />
				</button>
			</form>
		</>
	)
}

export default Search
