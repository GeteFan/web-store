import { executeQuery } from "../database/database.js";

const create = async (name, shoppingListId) => {
  await executeQuery(
    "INSERT INTO store_page_items (name, store_page_id) VALUES ($name , $shoppingListId);",
    {name: name, shoppingListId: shoppingListId},
  );
};

const findAllItems = async (shoppingListId) => {
    const notCollected = await executeQuery("SELECT * FROM store_page_items WHERE collected = false AND store_page_id = $shoppingListId ORDER BY name ASC;",
    {shoppingListId: shoppingListId},
    );
    const collected = await executeQuery("SELECT * FROM store_page_items WHERE collected = true AND store_page_id = $shoppingListId ORDER BY name ASC;",
    {shoppingListId: shoppingListId},
    );
    return { listId: shoppingListId, nonCollected: notCollected, collected: collected };
};

const countAllItems = async () => {
    const number = await executeQuery("SELECT COUNT(*) FROM store_page_items;");
    const result = parseInt(number.rows[0].count);
    if (result == undefined || result < 1) {
      return 0;
    } else {
      return `Shopping lists: ${result}`;
    }
}


const collectItem = async (id) => {
    await executeQuery("UPDATE store_page_items SET collected = true WHERE id = $id;",
    {id: id},
    );
};

export { create, collectItem, findAllItems, countAllItems };
