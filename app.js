import fs from "fs";
const command = process.argv[2];
const filename = process.argv[3];
const content = process.argv.slice(4).join(" ");
//create
if (command === "create" && filename) {
  fs.writeFileSync(filename, "");
  console.log(`File ${filename} created successfully.`);
}
//write
else if (command === "write" && filename && process.argv.length >= 5) {
  fs.writeFileSync(filename, content);
  console.log(`Content written to ${filename}.`);
}
//append
else if (command === "append" && filename && process.argv.length >= 5) {
  fs.appendFileSync(filename, content);
  console.log(`Content appended to ${filename}.`);
}
//read
else if (command === "read" && filename) {
  if (!fs.existsSync(filename)) {
    console.log(`File ${filename} does not exist.`);
  } else {
    const fileData = fs.readFileSync(filename, "utf8");
    console.log(fileData);
  }
}
//list
else if (command === "list") {
  const entries = fs.readdirSync(".");
  entries.forEach((entry) => console.log(entry));
}
//delete
else if (command === "delete" && filename) {
  if (!fs.existsSync(filename)) {
    console.log(`File ${filename} does not exist.`);
  } else {
    fs.unlinkSync(filename);
    console.log(`File ${filename} deleted successfully.`);
  }
} else {
  console.log("Somthing error in the process");
}
