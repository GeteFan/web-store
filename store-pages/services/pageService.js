import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO store_pages (name) VALUES ($name);",
  {name: name},
  );
};

const deactivatePage = async (id) => {
  await executeQuery("UPDATE store_pages SET active = false WHERE id = $id;",
  {id: id},
  );
};

const getPageName = async (id) => {
  return await executeQuery("SELECT name FROM store_pages WHERE id = $id;",
  {id: id},
  );
};

const findAllActivePages = async () => {
  return await executeQuery("SELECT * FROM store_pages WHERE active = true;");
};

const countAllPages = async () => {
  const number = await executeQuery("SELECT COUNT(*) FROM store_pages;");
  const result = parseInt(number.rows[0].count);
  if (result == undefined || result < 1) {
    return "No shopping lists yet.";
  } else {
    return `Shopping lists: ${result}`;
  }
}

export { create, deactivatePage, findAllActivePages, getPageName, countAllPages }; 