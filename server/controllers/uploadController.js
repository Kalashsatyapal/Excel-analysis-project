const ExcelJS = require("exceljs");
const User = require("../models/User");
const ExcelDataModel = require("../models/ExcelData");

exports.uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.originalname.match(/\.(xlsx|xls)$/))
      return res.status(400).json({ msg: "Only Excel files allowed" });

    // ✅ Read Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.worksheets[0];

    const rows = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[`col${colNumber}`] = cell.value;
      });
      rows.push(rowData);
    });

    // ✅ Store data
    await ExcelDataModel.insertMany(rows);

    // ✅ Store filename in user's history
    const user = await User.findById(req.user.userId); // From JWT
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.uploadedFiles = user.uploadedFiles || [];
    user.uploadedFiles.push(file.originalname);
    await user.save();

    res.status(200).json({ msg: "Excel uploaded and parsed", data: rows.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
