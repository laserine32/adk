import { db } from "@/db"
import { tags } from "@/db/schema"
import { eq } from "drizzle-orm";

export type Tags = typeof tags.$inferSelect;

export async function getAllTags(){
  return db
    .select()
    .from(tags)
    .orderBy(tags.name)
}

export type AllTags = Awaited<
  ReturnType<typeof getAllTags>
>

export function groupTags(data: AllTags){
  return Object.groupBy(data, (e) => e.type) 
}

export type GroupTags = ReturnType<typeof groupTags>

export async function getTags(id: number): Promise<Tags>{
  const [data] = await db
    .select()
    .from(tags)
    .where(eq(tags.id, id))
  if (!data) {
    return {
      id: -1,
      type: "Not Found",
      name: "Not Found"
    }
  }
  return data
}
