import { addKomikApi } from "@/db/queries/add-komik";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const result = await addKomikApi(body);
		if (result === false) {
			throw new Error(`Failed to add Komik`);
		}
		return NextResponse.json({ message: `Komik added successfully!` }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: `${error}` }, { status: 500 });
	}
};
