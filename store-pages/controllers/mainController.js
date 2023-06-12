import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as pageService from "../services/pageService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewMain = async (request) => {
    const data = {
      store_pages: await pageService.countAllPages(),
      page_items: await itemService.countAllItems(),
    };
  
    return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewMain };