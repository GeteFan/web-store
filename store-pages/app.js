import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as pageController from "./controllers/pageController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js";
import * as phoneCaseController from "./controllers/phoneCaseController.js";
import * as phoneCase2Controller from "./controllers/phoneCase2Controller.js";
import * as customCaseController from "./controllers/customCaseController.js";
import * as contactUsController from "./controllers/contactUsController.js";
import * as aboutUsController from "./controllers/aboutUsController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.viewMain(request);
  } else if (url.pathname === "/phoneCase" && request.method === "GET") {
    return await phoneCaseController.viewPhoneCase(request);
  } else if (url.pathname === "/phoneCase2" && request.method === "GET") {
    return await phoneCase2Controller.viewPhoneCase(request);
  } else if (url.pathname === "/customCase" && request.method === "GET") {
    return await customCaseController.viewCustomCase(request);
  } else if (url.pathname === "/contactUs" && request.method === "GET") {
    return await contactUsController.viewContactUs(request);
  } else if (url.pathname === "/aboutUs" && request.method === "GET") {
    return await aboutUsController.viewAboutUs(request);
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