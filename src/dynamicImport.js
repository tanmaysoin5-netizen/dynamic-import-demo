// src/dynamicImport.js
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Dynamically import a file (ESM .mjs/.js or JSON)
 * - Supports JSON import with assert { type: "json" }
 * - Returns:
 *    - if module has a default export -> module.default
 *    - otherwise -> the full module object (with named exports)
 *
 * @param {string} filePath - path to file, relative or absolute
 * @returns {Promise<any|null>} - resolved export or null on failure
 */
export async function dynamicImport(filePath) {
  try {
    // Resolve to absolute path
    const absPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    const ext = path.extname(absPath).toLowerCase();
    const url = pathToFileURL(absPath).href;

    let module;

    if (ext === ".json") {
      // JSON import with assertion
      module = await import(url, { assert: { type: "json" } });
    } else if (ext === ".mjs" || ext === ".js") {
      // ESM dynamic import
      module = await import(url);
    } else {
      throw new Error(`Unsupported file extension "${ext}"`);
    }

    // If module has default export, return it. Otherwise return the module object.
    // Note: JSON modules in Node are provided as { default: <parsed JSON> }.
    return module?.default ?? module;
  } catch (err) {
    // Graceful error handling: print useful message and return null
    console.error(`dynamicImport: failed to import "${filePath}": ${err.message}`);
    return null;
  }
}
