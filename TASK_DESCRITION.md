# Web Development Home Task

## Description

- Open the current Revolut app, on either iOS or Android, and navigate to the exchange screen.

- If the app is not available in your country, you can observe how the application works in this video: https://youtu.be/c0zPSiKYipc?t=29s. (Exchange screen is at the 29th second of the video).

P.S. It is not required to implement the rates screen (1:05 in the video).

- Implement the functionality of this screen only in your own custom web widget, using FX rates from any of these sources:

    - http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html#dev
    - https://openexchangerates.org/
    - your preferred source of FX rates.

## Business requirements

- Refresh the rate every 10s (we do not expect the rate to change every 10s as most free rate sources won't provide live rates).
- Contain at least three currency accounts with USD, EUR, GBP.
- Make it possible to make an exchange between accounts.
- Contain two inputs on the exchange screen for both accounts. Each input should be
validated to let the user type only numbers with two digits after the dot.
- Give all the necessary information: exchange rate between active accounts and account
balances.

## Tech requirements

- The app is written in React.
- Typed JavaScript (we love TypeScript).
- Test your application with Jest.
- Use any libraries that you think are a reasonable choice for this task.
- Don't hesitate to use the latest technologies and design patterns. Only the latest modern
browsers (Chrome/Safari) are your limitation.
- Please make sure your package.json contains:
    - "start" script -- should launch the app on localhost. 
    - "test" script -- should run tests in your app.
    
## Implicit requirements

- The widget must work and produce correct results.
- Test your app before writing to us that it is ready.
- The code produced is expected to be of a high standard.
- You can implement the widget with any design you want, but you should make it look nice.
