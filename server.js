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

const getAllSuporttedCurrencies = async (req, res, next) => {
  let supportedCurrencies = [];
  try {
    const result = await axios.get(`${BASE_API_URL}/list`, {
      params: {
        access_key: API_KEY
      }
    });
    supportedCurrencies = Object.entries(result.data.currencies).map(([currencyCode, value]) => (
      {
        label: `${currencyCode} - ${value}`,
        code: currencyCode
      }
    ))
  } catch (error) {
    console.error(error);
  }

  return supportedCurrencies;
}

const convertFromOneCurrencyToAnother = async (baseCurrency, targetCurrency, amt) => {
  let conversionResult = 0;
  try {
    const result = await axios.get(`${BASE_API_URL}/convert`, {
      params: {
        access_key: API_KEY,
        from: baseCurrency,
        to: targetCurrency,
        amount: amt
      }
    });
    conversionResult = result.data.result;
  } catch (error) {
    console.error(error);
  }

  return conversionResult;
}

app.get("/", async (req, res) => {
  const supportedCurrencies = await getAllSuporttedCurrencies();
  res.render("index.ejs", { supportedCurrencies: supportedCurrencies });
});

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;  
  const result = await convertFromOneCurrencyToAnother(from, to, amount);
  res.json({result}); //send result back to the frontend.
});

app.listen(port, () => {
  console.log(`Currency converter is listening on port ${port}`);
});