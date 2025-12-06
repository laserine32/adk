import ProgressBar from "@/components/shared/progress-bar"
import Navbar from "@/components/ui/navbar"
import { Suspense } from "react"

const MainLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Suspense fallback={null}>
					<ProgressBar />
					<div className="py-4 px-2 md:px-10">{children}</div>
			</Suspense>
		</>
	)
}

export default MainLayout
