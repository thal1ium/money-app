import axios from "axios";

class NewTransaction {
  constructor(type, comment, price) {
    this.type = type;
    this.comment = comment;
    this.price = price;
  }
};

class MoneyTransactionManeger {
  addTransaction = async function (type, comment, sum) {
    const transaction = new NewTransaction(type, comment, sum);

    await axios.post("https://money-app-server.onrender.com/transactions", { ...transaction })
      .catch(function (error) { throw Error(error); });
  };

  removeTransaction = async function (id) {
    await axios.delete(`https://money-app-server.onrender.com/transactions/${id}`)
      .catch(function (error) { throw Error(error); });
  };

  // updateTransaction = function (id, newDetails) {
  //   const transaction = this.transactionDB.find(item => item.id === id);

  //   if (transaction) {
  //     for (const key in newDetails) {
  //       transaction[key] = newDetails[key];
  //     }
  //   }
  // };

  getTransactionsList = async function () {
    const response = await axios.get("https://money-app-server.onrender.com/transactions");
    return response.data;
  };
};

export default MoneyTransactionManeger;