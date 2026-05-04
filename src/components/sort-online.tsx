"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const SortOnline = () => {
	const pathname: string = usePathname();
	const searchParams = useSearchParams();
	const currentSort: string = searchParams.get("sort") || "date";

	const createPageURL = (sort: string): string => {
		const params: URLSearchParams = new URLSearchParams(searchParams);
		params.set("sort", sort);
		return `${pathname}?${params.toString()}`;
	};

	return (
		<>
			<div className="inline-flex gap-4">
				<NavButton text="Recent" position="single" href={createPageURL("date")} isActive={currentSort == "date"} />
				<div className="flex -space-x-px items-center">
					<h3 className="mr-2">Popular:</h3>
					<NavButton
						text="Week"
						position="first"
						href={createPageURL("popular-week")}
						isActive={currentSort == "popular-week"}
					/>
					<NavButton
						text="Month"
						position="middle"
						href={createPageURL("popular-month")}
						isActive={currentSort == "popular-month"}
					/>
					<NavButton
						text="All Time"
						position="last"
						href={createPageURL("popular")}
						isActive={currentSort == "popular"}
					/>
				</div>
			</div>
		</>
	);
};

type NavButtonPropsType = {
	text: string;
	position: "first" | "middle" | "last" | "single" | undefined;
	href: string;
	isActive: boolean;
};

const NavButton: React.FC<NavButtonPropsType> = ({ text, position, href, isActive }) => {
	return (
		<>
			<div
				className={cn("linking p-2 flex items-center justify-center border border-input", {
					"rounded-l-sm": position === "first" || position === "single",
					"rounded-r-sm": position === "last" || position === "single",
					"z-10 bg-input text-primary-foreground boder-border": isActive,
					"hover:bg-input hover:text-primary-foreground": !isActive,
				})}
			>
				<Link href={href}>{text}</Link>
			</div>
		</>
	);
};

export default SortOnline;
