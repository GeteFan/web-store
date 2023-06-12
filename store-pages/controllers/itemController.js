import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as pageService from "../services/pageService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const pageId = urlParts[2];

    const formData = await request.formData();
    const name = formData.get("name");
    
    await itemService.create(name, pageId);
  
    return requestUtils.redirectTo(`/pages/${ pageId }`);
};

const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const pageId = urlParts[2];
    const itemId = urlParts[3];

    await itemService.collectItem(itemId);
  
    return requestUtils.redirectTo(`/pages/${ pageId }`);
};

const viewListItems = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const pageId = urlParts[2];

    const data = {
        page_items: await itemService.findAllItems(pageId),
        page_name: await pageService.getPageName(pageId),
    };
    console.log("items");
    console.log(data.page_items.nonCollected);
    console.log(data.page_items.collected);
    console.log(data.page_name.rows[0]);
    return new Response(await renderFile("page.eta", data), responseDetails);
};

export { addItem, collectItem, viewListItems };