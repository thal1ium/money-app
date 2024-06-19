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

    await axios.post("http://localhost:3000/transactions", { ...transaction })
      .catch(function (error) { throw Error(error); });
  };

  removeTransaction = async function (id) {
    await axios.delete(`http://localhost:3000/transactions/${id}`)
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
    const response = await axios.get("http://localhost:3000/transactions");
    return response.data;
  };
};

export default MoneyTransactionManeger;