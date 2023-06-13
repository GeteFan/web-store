import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as pageController from "./controllers/pageController.js";
import * as itemController from "./controllers/itemController.js";
import { Application, send, static } from 'https://deno.land/x/oak/mod.ts';

configure({
  views: `${Deno.cwd()}/views/`,
});

// Add the static files middleware
app.use(static('/styles'));

// Serve static files (including CSS)
app.use(async (ctx, next) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/views/layouts/styles`, // Path to the directory containing your static files
  });
  await next();
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

serve(handleRequest, { port: 7777 });