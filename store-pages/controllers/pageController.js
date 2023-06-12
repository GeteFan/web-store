import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as pageService from "../services/pageService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addPage = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await pageService.create(name);

  return requestUtils.redirectTo("/pages");
};

const deactivatePage = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const pageId = urlParts[2];

  await pageService.deactivatePage(pageId);

  return requestUtils.redirectTo(`/pages`);
};


const viewPages = async (request) => {
  const data = {
    store_pages: await pageService.findAllActivePages(),
  };
  console.log("Pages");
  console.log(data.store_pages.rows);
  return new Response(await renderFile("pages.eta", data), responseDetails);
};

export { addPage, deactivatePage, viewPages };