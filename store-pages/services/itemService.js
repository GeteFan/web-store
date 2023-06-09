import { executeQuery } from "../database/database.js";

const create = async (name, shoppingListId) => {
  await executeQuery(
    "INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name , $shoppingListId);",
    {name: name, shoppingListId: shoppingListId},
  );
};

const findAllItems = async (shoppingListId) => {
    const notCollected = await executeQuery("SELECT * FROM shopping_list_items WHERE collected = false AND shopping_list_id = $shoppingListId ORDER BY name ASC;",
    {shoppingListId: shoppingListId},
    );
    const collected = await executeQuery("SELECT * FROM shopping_list_items WHERE collected = true AND shopping_list_id = $shoppingListId ORDER BY name ASC;",
    {shoppingListId: shoppingListId},
    );
    return { listId: shoppingListId, nonCollected: notCollected, collected: collected };
};

const countAllItems = async () => {
    const number = await executeQuery("SELECT COUNT(*) FROM shopping_list_items;");
    const result = parseInt(number.rows[0].count);
    if (result == undefined || result < 1) {
      return 0;
    } else {
      return `Shopping lists: ${result}`;
    }
}


const collectItem = async (id) => {
    await executeQuery("UPDATE shopping_list_items SET collected = true WHERE id = $id;",
    {id: id},
    );
};

export { create, collectItem, findAllItems, countAllItems };
