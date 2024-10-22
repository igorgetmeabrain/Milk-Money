
// average UK supermarket milk price per litre (Aug 2024)
const milkPricePerLitre = 0.95

// one moonit is equivalent to 100ml of cow's milk at the going rate (approx measure for one hot drink)
const moonitPrice = (milkPricePerLitre/10).toFixed(2);

/*
// {units, qty} = req.body;
const units = "Pints";
const qty = "4";

const user = {
  username: "Doug",
  transactions: [],
  balance: 10
}

const moonits = convertToMoonits(qty, units)
user.balance += moonits
user.transactions.push(moonitTransactionId(moonits))
console.log(user.balance)
console.log(user.transactions)

res.json({
  balance: user.balance,
  transactions: user.transactions,
  moonits: moonits
}) 

// update user in database
// update database leaderboard
// users are only entered into leaderboard database when they have transactions 

*/

class Converter {

  // 1 pint = 0.568 litres
  convertToMoonits(qty, units) {return units == "Litres" ? Math.round(+qty*10) : Math.round(+qty*5.68)}

  // transaction id for database
  moonitTransactionId(moonits) {return `{moonits}-${Date.now()}`}

}

module.exports = Converter;