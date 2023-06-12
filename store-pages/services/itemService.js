import { executeQuery } from "../database/database.js";

const create = async (name, storePageId) => {
  await executeQuery(
    "INSERT INTO store_page_items (name, store_page_id) VALUES ($name , $storePageId);",
    {name: name, storePageId: storePageId},
  );
};

const findAllItems = async (storePageId) => {
    const notCollected = await executeQuery("SELECT * FROM store_page_items WHERE collected = false AND store_page_id = $storePageId ORDER BY name ASC;",
    {storePageId: storePageId},
    );
    const collected = await executeQuery("SELECT * FROM store_page_items WHERE collected = true AND store_page_id = $storePageId ORDER BY name ASC;",
    {storePageId: storePageId},
    );
    return { pageId: storePageId, nonCollected: notCollected, collected: collected };
};

const countAllItems = async () => {
    const number = await executeQuery("SELECT COUNT(*) FROM store_page_items;");
    const result = parseInt(number.rows[0].count);
    if (result == undefined || result < 1) {
      return 0;
    } else {
      return `Store pages: ${result}`;
    }
}


const collectItem = async (id) => {
    await executeQuery("UPDATE store_page_items SET collected = true WHERE id = $id;",
    {id: id},
    );
};

export { create, collectItem, findAllItems, countAllItems };
