import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const listId = urlParts[2];

  await listService.deactivateList(listId);

  return requestUtils.redirectTo(`/lists`);
};


const viewLists = async (request) => {
  const data = {
    shopping_lists: await listService.findAllActiveLists(),
  };
  console.log("Lists");
  console.log(data.shopping_lists.rows);
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addList, deactivateList, viewLists };