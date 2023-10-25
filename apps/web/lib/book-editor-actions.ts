"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";
import type { DataTypes } from "@/components/book-editor";

export async function updateBook(data: DataTypes) {
  try {
    const { id: bid } = await prisma.book.upsert({
      where: { title: data.title },
      update: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        authors: {
          connectOrCreate: data?.authors?.map((author) => ({
            where: { name: author.value },
            create: { name: author.value, avatar: "" },
          })),
        },
        translators: {
          connectOrCreate: data?.translators?.map((translator) => ({
            where: { name: translator.value },
            create: { name: translator.value, avatar: "" },
          })),
        },
      },
      create: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        authors: {
          connectOrCreate: data?.authors?.map((author) => ({
            where: { name: author.value },
            create: { name: author.value, avatar: "" },
          })),
        },
        translators: {
          connectOrCreate: data?.translators?.map((translator) => ({
            where: { name: translator.value },
            create: { name: translator.value, avatar: "" },
          })),
        },
      },
    });

    return revalidatePath(`/book/${bid}`), {};
  } catch (error: any) {
    return { error: error.message };
  }
}
