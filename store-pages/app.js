import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as pageController from "./controllers/pageController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js";
import './views/layouts/layout-styles.css'

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

serve(handleRequest, { port: 7777 });