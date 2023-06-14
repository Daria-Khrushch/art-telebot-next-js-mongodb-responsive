import { PrismaClient } from "@prisma/client";
import { parse } from "url";
const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    const { title, theme, language } = query;

    // console.log("title", title);
    // console.log("theme", theme);
    // console.log("language", language);
    // console.log(query);
    if (title && !theme && !language) {
      const channels = await prisma.channel.findMany({
        where: {name: title || ""},
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (theme && !title && !language) {
      const channels = await prisma.channel.findMany({
        where: {theme: theme || ""},
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && !theme && !title) {
      const channels = await prisma.channel.findMany({
        where: { language: language || ""},
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && theme && !title) {
      const channels = await prisma.channel.findMany({
        where: {
              theme: theme || "",
              language: language || ""
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (title && theme && !language) {
      const channels = await prisma.channel.findMany({
        where: {
              name: title || "",
              theme: theme || ""
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && title && !theme) {
      const channels = await prisma.channel.findMany({
        where: {
              name: title || "",
              language: language || ""
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else if (language && title && theme) {
      const channels = await prisma.channel.findMany({
        where: {
          name: title || "",
          theme: theme || "",
          language: language || "",
        },
      });
      return new Response(JSON.stringify(channels), { status: 200 });
    } else {
      const channels = await prisma.channel.findMany();
      return new Response(JSON.stringify(channels), { status: 200 });
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
