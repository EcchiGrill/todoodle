import { getTodos } from "@/api/todos";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const todos = await getTodos();
  return [
    {
      url: process.env.NEXT_PUBLIC_URL as string,
      lastModified: new Date(),
    },
    ...Array.from({ length: todos.length }).map((_, i) => {
      return {
        url: `${process.env.NEXT_PUBLIC_URL}/page/${i + 1}`,
      };
    }),
  ];
}
