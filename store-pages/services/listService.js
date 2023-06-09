import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);",
  {name: name},
  );
};

const deactivateList = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id;",
  {id: id},
  );
};

const getListName = async (id) => {
  return await executeQuery("SELECT name FROM shopping_lists WHERE id = $id;",
  {id: id},
  );
};

const findAllActiveLists = async () => {
  return await executeQuery("SELECT * FROM shopping_lists WHERE active = true;");
};

const countAllLists = async () => {
  const number = await executeQuery("SELECT COUNT(*) FROM shopping_lists;");
  const result = parseInt(number.rows[0].count);
  if (result == undefined || result < 1) {
    return "No shopping lists yet.";
  } else {
    return `Shopping lists: ${result}`;
  }
}

export { create, deactivateList, findAllActiveLists, getListName, countAllLists }; 