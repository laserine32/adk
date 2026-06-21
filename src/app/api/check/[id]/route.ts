import { checkOnlineKomik } from "@/db/queries/add-komik";
import { NextRequest, NextResponse } from "next/server";

type ChekApiIdProps = {
	params: Promise<{ id: number }>;
};

export async function GET(request: NextRequest, { params }: ChekApiIdProps) {
	const { id } = await params;
	const available = await checkOnlineKomik(id);
	return NextResponse.json({ available }, { status: 200 });
}
