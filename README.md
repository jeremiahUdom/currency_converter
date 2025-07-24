
# Currency Converter

This is a simple project I built to practice APIs and how to interact with APIs using Axios. The application allows users to be able to convert from one currency to another using accurate data and up-to-date exchange rates. It demonstrates how to fetch data from an external API, process it, and display the result dynamically on a web interface.


## Tech Stack

**Frontend:** HTML, CSS, EJS.

**Backend:** Node.js + Express.js.

**HTTP Client**: Axios.

## Features

- **Real‑Time Exchange Rates**
Fetches up‑to‑the‑minute rates from the Exchange Rate API.

- **Convert Between Any Two Currencies**
Supports conversion between all 161 currencies returned by the API.

- **Dynamic Currency List**
Automatically populates the “From” and “To” dropdowns based on available currencies.
## Installation
**Prerequisites**

Make sure you have the following installed:

- Node.js
- npm or yarn (for package management).


**Steps to run MakeWeGo locally**:

- **Clone the repository**
```bash
  git clone https://github.com/jeremiahUdom/currency_converter.git
```

- **Navigate to the project folder**
```bash
  cd currency_converter
```

- **Install dependencies**
```bash
  npm install
  OR
  yarn install
```
- **Get an API Key**
    - Go to https://www.exchangerate-api.com/ and create a free account.

    - After signing up, you'll receive an API key in your dashboard.

- **Set Up Environment Variables**
Create a .env file in the root of the project and add the following:
```bash
    PORT=your_port_here
    PUBLIC_BASE_API_URL=http://api.currencylayer.com
    PUBLIC_API_KEY=your_api_key_here
```

- **Run the application**
```bash
    Nodemon server.js
```
    
## Feedback
If you have any suggestions, questions, or encounter any issues while using the project, feel free to open an issue or reach out directly.

You can also connect with me on GitHub for feedback or collaboration.
 - Email: jeremiahudom07@gmail.com