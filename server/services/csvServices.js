import fs from "fs";
import csv from "csv-parser";
import { parse } from "json2csv";

/* IMPORT DATA FROM CSV */
async function importFromCSV(filePath) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

/* EXPORT DATA TO CSV */
async function exportToCSV(data, filePath) {
  const csvData = parse(data);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, csvData, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export default {
  importFromCSV,
  exportToCSV,
};
