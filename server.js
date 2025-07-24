import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;
const BASE_API_URL = process.env.PUBLIC_BASE_API_URL;
const API_KEY = process.env.PUBLIC_API_KEY;

app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));

const getAllSuporttedCurrencies = async () => {
  let supportedCurrencies = [];
  try {
    const result = await axios.get(`${BASE_API_URL}/${API_KEY}/codes`);
    supportedCurrencies = result.data.supported_codes.map(row => {
      return {
        label: `${row[0]} - ${row[1]}`,
        code: row[0]
      }
    });
  } catch (error) {
    console.error(error);
  }

  return supportedCurrencies;
}

const convertFromOneCurrencyToAnother = async (baseCurrency, targetCurrency, amt) => {
  let conversionResult = 0;
  let conversionRate = 0;
  try {
    const result = await axios.get(`${BASE_API_URL}/${API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amt}`);
    conversionResult = result.data.conversion_result;
    conversionRate = result.data.conversion_rate;
  } catch (error) {
    console.error(error);
  }

  return { conversionResult, conversionRate };
}

app.get("/", async (req, res) => {
  const supportedCurrencies = await getAllSuporttedCurrencies();
  res.render("index.ejs", { supportedCurrencies: supportedCurrencies });
});

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;  
  const result = await convertFromOneCurrencyToAnother(from, to, amount);
  res.json({
    conversionRate: result.conversionRate,
    conversionResult: result.conversionResult
  }); //send result back to the frontend.
});

app.listen(port, () => {
  console.log(`Currency converter is listening on port ${port}`);
});