import fs from "fs";
import path from "path";

// daftar file yang mau dibuat
// path = otomatis bikin foldernya juga

const files = [
  "server.js",
  "index.html",

];
// loop semua file
files.forEach((file) => {
  const dir = path.dirname(file);

  // kalau folder belum ada → bikin
  if (dir !== "." && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // kalau file belum ada → bikin
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "");
    console.log("✔ created:", file);
  } else {
    console.log("⏭ skipped:", file);
  }
});

console.log("\nStruktur project berhasil dibuat");
