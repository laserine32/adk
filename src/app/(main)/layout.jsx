import Navbar from "@/components/ui/navbar"

const MainLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="py-4 px-2 md:px-10">{children}</div>
		</>
	)
}

export default MainLayout
