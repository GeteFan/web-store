import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";

import * as pageController from "./controllers/pageController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.viewMain(request);
  } else if (url.pathname === "/pages" && request.method === "POST") {
    return await pageController.addPage(request);
  } else if (url.pathname === "/pages" && request.method === "GET") {
    return await pageController.viewPages(request);
  } else if (url.pathname.match("pages/[0-9]+/deactivate") && request.method === "POST") {
    return await pageController.deactivatePage(request);
  } else if (url.pathname.match("pages/[0-9]+") && request.method === "GET") {
    return await itemController.viewPageItems(request);
  } else if (url.pathname.match("pages/[0-9]+/items" ) && request.method === "POST") {
    return await itemController.addItem(request);
  } else if (url.pathname.match("pages/[0-9]+/[0-9]+/collect") && request.method === "POST") {
    console.log("collect");
    return await itemController.collectItem(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

const server = serve({ port: 7777 });

// Serve static files (including CSS)
for await (const request of server) {
  if (request.method === "GET") {
    const staticPath = `${Deno.cwd()}/styles${request.url.pathname}`;
    try {
      const file = await Deno.open(staticPath);
      request.respond({ body: file });
      file.close();
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        await handleRequest(request);
      } else {
        request.respond({ status: 500 });
      }
    }
  } else {
    await handleRequest(request);
  }
}