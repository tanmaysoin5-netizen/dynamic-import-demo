// src/index.mjs
import { dynamicImport } from "./dynamicImport.js";
import path from "node:path";

async function run() {
  console.log("Demo: dynamicImport examples\n");

  const base = path.join("src", "modules");

  // 1) Import .mjs that has default + named export
  const modDefault = await dynamicImport(path.join(base, "moduleWithDefault.mjs"));
  if (modDefault) {
    // We got the default export (function)
    console.log("moduleWithDefault.mjs -> default export result:", modDefault("Tanmay"));
  } else {
    console.log("moduleWithDefault.mjs -> failed to import");
  }

  // 2) Import .js that uses named exports (dynamicImport will return the module object)
  const modNamed = await dynamicImport(path.join(base, "moduleNamed.js"));
  if (modNamed) {
    // dynamicImport returns module.default ?? module
    // For a module with only named exports, it returns the module object.
    // Use named exports directly:
    console.log("moduleNamed.js -> add(2,3) =", modNamed.add(2, 3));
    console.log("moduleNamed.js -> description =", modNamed.description);
  }

  // 3) Import JSON with assertion
  const jsonData = await dynamicImport(path.join(base, "data.json"));
  if (jsonData) {
    // For JSON imports Node provides it as default, and we returned that default
    console.log("data.json -> appName:", jsonData.appName);
    console.log("data.json -> features:", jsonData.features.join(", "));
  }

  // 4) Trying to import a missing file (graceful error)
  const missing = await dynamicImport(path.join(base, "doesNotExist.mjs"));
  console.log("doesNotExist.mjs ->", missing); // null and printed error earlier

  console.log("\nDemo complete.");
}

await run();
