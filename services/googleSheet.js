require("dotenv").config();
const { google } = require("googleapis");
const auth = require("../config/googleClient");
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = "Sheet1!A:C";

const appendToSheet = async (data) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const { name, email, message } = data;

  const googleResponse = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, message]],
    },
  });
  // console.log("Response from google sheet : ", googleResponse);
};

module.exports = { appendToSheet };
