const targetCurrency = document.querySelector("#target_currency");
const targetAmt = document.querySelector("#target_amt");
const amountToConvert = document.querySelector("#amt");
const mainDiv = document.querySelector("main");
const baseCurrency = document.querySelector("#base_currency");

const displayConversionRate = (baseCurrency, targetCurrency, conversionRate) => {
  let conversionRateText = document.querySelector(".conversion_rate_text");
  const containsConversionRate = mainDiv.contains(conversionRateText);

  if (containsConversionRate) {
    conversionRateText.textContent = `1 ${baseCurrency} = ${conversionRate} ${targetCurrency}`;
    return;
  }

  conversionRateText = document.createElement("p");
  conversionRateText.className = "conversion_rate_text";
  conversionRateText.textContent = `1 ${baseCurrency} = ${conversionRate} ${targetCurrency}`;
  mainDiv.appendChild(conversionRateText);
}

const convertCurrency = async (baseCurrency, targetCurrency, amountToConvert) => {
  const response = await axios.get("/convert", {
    params: {
      from: baseCurrency,
      to: targetCurrency,
      amount: amountToConvert,
    }
  });

  const data = {
    conversionRate: response.data.conversionRate,
    conversionResult: response.data.conversionResult
  }
  
  return data;
}

amountToConvert.addEventListener("input", async (e) => {
  if (baseCurrency.value === "select a currency" || targetCurrency.value === "select a currency"){
    return;
  }

  try {
    targetAmt.value = "Hang tight.....";
    const result = await convertCurrency(baseCurrency.value, targetCurrency.value, e.target.value);
    const { conversionRate, conversionResult } = result;
    displayConversionRate(baseCurrency.value, targetCurrency.value, conversionRate);
    targetAmt.value = conversionResult;
  } catch (error) {
    console.error("error")
  }
});

baseCurrency.addEventListener("change", async (e) => {
  if (targetCurrency.value === "select a currency" || amountToConvert.value.trim() === "") {
    return;
  }

  try {
    targetAmt.value = "Hang tight.....";
    const result = await convertCurrency(e.target.value, targetCurrency.value, amountToConvert.value);
    const { conversionRate, conversionResult } = result;
    displayConversionRate(e.target.value, targetCurrency.value, conversionRate);
    targetAmt.value = conversionResult;
  } catch (error) {
    console.error("error")
  }
});

targetCurrency.addEventListener("change", async (e) => {
  if (baseCurrency.value === "select a currency" || amountToConvert.value.trim() === "") {
    return;
  }

  try {
    targetAmt.value = "Hang tight.....";
    const result = await convertCurrency(baseCurrency.value, e.target.value, amountToConvert.value);
    const { conversionRate, conversionResult } = result;
    displayConversionRate(baseCurrency.value, e.target.value, conversionRate);
    targetAmt.value = conversionResult;
  } catch (error) {
    console.error("error")
  }
});