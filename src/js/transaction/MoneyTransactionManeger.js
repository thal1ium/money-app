import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function NewTransaction(id, type, comment, price) {
  this.id = id;
  this.type = type;
  this.comment = comment;
  this.price = price;
};

function MoneyTransactionManeger() {
  this.addTransaction = function (type, comment, sum) {
    const transaction = new NewTransaction(uuidv4(), type, comment, sum);

    axios.post("http://localhost:3000/transactions", { ...transaction })
      .then(function (response) { console.log(response); })
      .catch(function (error) { throw Error(error) })
  };

  // this.removeTransaction = function (id) {
  //   this.transactionDB = this.studentsDB.filter(item => item.id !== id);
  // };

  // this.updateTransaction = function (id, newDetails) {
  //   const transaction = this.transactionDB.find(item => item.id === id);

  //   if (transaction) {
  //     for (const key in newDetails) {
  //       transaction[key] = newDetails[key];
  //     }
  //   }
  // };

  this.getTransactionsList = async function () {
    return await axios.get("http://localhost:3000/transactions")
      .catch(function (error) { throw Error(error) })
  };
};

export default MoneyTransactionManeger;