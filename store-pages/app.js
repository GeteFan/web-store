import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { configure, renderFile } from "https://deno.land/x/eta/mod.ts";
import * as pageController from "./controllers/pageController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const app = new Application();
const port = 7777;

// Serve static files
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/styles`,
    index: "/views/layouts/layout.eta",
  });
});

// Define routes
app.use(async (context) => {
  const url = new URL(context.request.url);
  
  if (url.pathname === "/" && context.request.method === "GET") {
    return await mainController.viewMain(context);
  } else if (url.pathname === "/pages" && context.request.method === "POST") {
    return await pageController.addPage(context);
  } else if (url.pathname === "/pages" && context.request.method === "GET") {
    return await pageController.viewPages(context);
  } else if (
    url.pathname.match("pages/[0-9]+/deactivate") &&
    context.request.method === "POST"
  ) {
    return await pageController.deactivatePage(context);
  } else if (url.pathname.match("pages/[0-9]+") && context.request.method === "GET") {
    return await itemController.viewPageItems(context);
  } else if (
    url.pathname.match("pages/[0-9]+/items") &&
    context.request.method === "POST"
  ) {
    return await itemController.addItem(context);
  } else if (
    url.pathname.match("pages/[0-9]+/[0-9]+/collect") &&
    context.request.method === "POST"
  ) {
    console.log("collect");
    return await itemController.collectItem(context);
  } else {
    context.response.status = 404;
    context.response.body = "Not found";
  }
});

// Start the server
app.addEventListener("listen", () => {
  console.log(`Server is running on port ${port}`);
});
await app.listen({ port });