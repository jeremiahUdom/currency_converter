const targetCurrency = document.querySelector("#target_currency");

targetCurrency.addEventListener("change", async (e) => {
  const baseCurrency = document.querySelector("#base_currency").value;
  const amountToConvert = document.querySelector("#amt").value;

  try {
    const response = await axios.get("/convert", {
      params: {
        from: baseCurrency,
        to: e.target.value,
        amount: amountToConvert,
      }
    });

    const { result } = response.data;
    targetCurrency.value = result;
  } catch (error) {
    console.error("error")
  }
});