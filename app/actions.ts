"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function updateProductAction(
  id: number
): Promise<never> {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const parsedId = Number(id);
  if (!Number.isSafeInteger(parsedId) || parsedId < 1) {
    redirect("/");
  }

  redirect("/");
}

export async function deleteProductAction(
  id: number
): Promise<never> {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const parsedId = Number(id);
  if (!Number.isSafeInteger(parsedId) || parsedId < 1) {
    redirect("/");
  }

  redirect("/");
}
