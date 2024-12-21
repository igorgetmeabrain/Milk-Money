
// average UK supermarket milk price per litre (Aug 2024)
const milkPricePerLitre = 0.95

// one moonit is equivalent to 25ml of cow's milk at the going rate (approx measure for one hot drink)
const moonitPrice = (milkPricePerLitre/40).toFixed(2);

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
  convertToMoonits(qty, units) {return units == "Litres" ? Math.round(+qty*40) : Math.round(+qty*22.72)}

  // transaction id for database
  transactionId(moonits) {return `${moonits}d${Date.now()}`}

  getDateString(date) {return new Date(date).toLocaleDateString(undefined, 
    {
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    }).split(",").join("");}

  transactionsObjects(array) {
    let formatted = [], splitTrans, transDate;
    for (let i=0; i<array.length; i++) {
      splitTrans = array[i].split("d");
      transDate = this.getDateString(+splitTrans[1])
      formatted.push({moonits: +splitTrans[0], date: transDate })
    }
    return formatted;
  }

  // takes unhashed value - first digit is question no and rest is answer
  securityQuestion(security) {
    return security;
  }
}

module.exports = Converter;