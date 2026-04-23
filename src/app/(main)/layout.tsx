import MainFallback from "@/components/main-fallback";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

const MainLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}> ) => {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<MainFallback/>}>
        <div className="py-4 px-2 md:px-10">{children}</div>
      </Suspense>
    </>
  )
}

export default MainLayout