
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

const quizQuestions = require('../components/quizquestions.json');

class Converter {

  // 1 pint = 0.568 litres
  convertToMoonits(qty, units) {return units == "Litres" ? Math.round(+qty*40) : Math.round(+qty*22.72)}

  // transaction id for database
  transactionId(moonits, type) {return `${moonits}${type}${Date.now()}`}

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
      splitTrans = array[i].split(/([db])/);
      splitTrans[0] = splitTrans[1] == "d" ? -Math.abs(+splitTrans[0]) : Math.abs(+splitTrans[0]);
      transDate = this.getDateString(+splitTrans[2])
      formatted.push({moonits: +splitTrans[0], date: transDate })
    }
    return formatted;
  }

  generateRandomQuestionsArray(askedArray) {

    if (askedArray.length + 10 > quizQuestions.questions.length) return false;

    let questionsArray = [];
    while (questionsArray.length < 10) {
      let random = Math.floor(Math.random() * quizQuestions.questions.length);
      let questionId = quizQuestions.questions[random].id;
      if (questionsArray.indexOf(questionId) === -1 && askedArray.indexOf(questionId) === -1) {
        questionsArray.push(questionId);
      }
    }
    questionsArray.unshift(new Date().toDateString());
    console.log(questionsArray)
    return questionsArray;    
  }

  generateQuestionsObject(questionsArray) {
    let questionsObject = {"questions": []};
    // ignore first element (datestamp)
    for (let i=1; i<questionsArray.length; i++) {
      // find matching id for questionsArray[i] in quizQuestions and push object to questionsObject.questions
    }
    return questionsObject;
  }

  // takes unhashed value - first digit is question no and rest is answer
  securityQuestion(security) {
    return security;
  }

}

module.exports = Converter;