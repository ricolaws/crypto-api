<h1 align="center">Cryptocurrency Dashboard</h1>

<div align="center">
   Track and chart the value of a portfolio of crypocurrencies.
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Setup](#setup)
- [Contact](#contact)

<!-- OVERVIEW -->

## Overview

<img width="1671" alt="Screen Shot 2022-03-09 at 2 07 02 PM" src="https://user-images.githubusercontent.com/41934323/157544783-26dbb0eb-8fd3-4c5a-8e3a-3bcb5054ab9d.png">

<img width="1671" alt="Screen Shot 2022-03-09 at 2 07 24 PM" src="https://user-images.githubusercontent.com/41934323/157544953-07935d23-73df-461e-863e-d44228a2f6b7.png">

- Account data is stored on Firebase.
- The CoinGecko API is used to get current price information for cryptocurrencies held in the account.
- The total amounts and values of each cryptocurrency held is calculated over time.
- Values of all assets are stored on a daily basis and summed to create a chart of total portfolio value over time.
- A searchable list of all cryptocurrencies on CoinGecko is available on the browse page.
- Chart.js is used for data visualization
- Visual patterns are combined with colors and assigned to each asset globally for accessibility.

### Built With

- JAVASCRIPT
- REACT
- REDUX
- CHART.JS
- CSS
- HTML
- FIREBASE

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm start
```

## Contact

- GitHub [@ricolaws](https://github.com/ricolaws)
