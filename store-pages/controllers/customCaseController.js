import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewCustomCase = async (request) => {
    const data = {
    };
  
    return new Response(await renderFile("customCase.eta", data), responseDetails);
};

export { viewCustomCase };