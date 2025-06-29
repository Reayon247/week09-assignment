"use server";

import { revalidatePath } from "next/cache";
import { db } from "./dbConnection";

export async function deletePost(Id) {
  await db.query("DELETE FROM week9post WHERE id = $1", [Id]);
  revalidatePath(`/`);
}
