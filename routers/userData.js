import express from "express";
import xlsx from "xlsx";
import fs from "fs";
import Order from "../model/userModel.js";
const router = express.Router();

//json into excel
router.post("/export", (req, res) => {
  try {
    const newData = req.body;
    const filePath = "./data.xlsx";
    let data = [];

    if (fs.existsSync(filePath)) {
      const workbook = xlsx.readFile(filePath); //open excel file
      const sheet = workbook.Sheets["Data"]; //give sheet name
      data = xlsx.utils.sheet_to_json(sheet);
    }
    data.push(newData);

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

    xlsx.writeFile(workbook, filePath); //writing excel file
    res.json({ message: "Excel file created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating excel" });
  }
});

//excel into json
router.get("/viewData", (req, res) => {
  try {
    const filePath = "./data.xlsx";
    if (!fs.existsSync(filePath)) {
      return res.json({ message: "No data found" });
    }
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets["Data"];
    const data = xlsx.utils.sheet_to_json(sheet);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error reading Excel" });
  }
});

//excel into mongoDB

router.get("/import-excel", async (req, res) => {
  try {
    const workbook = xlsx.readFile("./data.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(sheet);

    await Order.insertMany(data);
    res.json({ message: "Excel data imported to mongoDB" });
  } catch {
    res.status(500).json({ message: "Import failed" });
  }
});

export default router;
