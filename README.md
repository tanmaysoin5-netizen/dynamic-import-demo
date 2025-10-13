# dynamic-import-demo
Practical 7
# 🧩 Dynamic Import Demo (ESM + JSON Assertions)

This project demonstrates how to **dynamically import ESM modules** (`.mjs`, `.js`) and **JSON files** (with `assert { type: "json" }`) in **Node.js**.  
It also includes a **graceful fallback system** — returning the `default` export if it exists, or the full module object otherwise.

---

## Features

✅ Supports `.mjs` and `.js` ESM modules  
✅ Supports JSON imports using `assert { type: "json" }`  
✅ Graceful fallback for `default` or named exports  
✅ Clear error handling for missing or invalid files  
✅ Fully ESM project (uses `"type": "module"` in `package.json`)



## HoW IT WORKS (src/dynamicImport.js) 
export async function dynamicImport(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const url = pathToFileURL(filePath).href;

  let module;
  if (ext === ".json") {
    module = await import(url, { assert: { type: "json" } });
  } else if (ext === ".mjs" || ext === ".js") {
    module = await import(url);
  } else {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  return module?.default ?? module;
}


Uses import() for dynamic importing
Detects file type (.mjs, .js, .json)
Uses JSON import assertions for .json files
Returns:
module.default if a default export exists
or the full module object if not
