import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function NewTransaction(id, type, comment, price) {
  this.id = id;
  this.type = type;
  this.comment = comment;
  this.price = price;
};

function MoneyTransactionManeger() {
  this.addTransaction = async function (type, comment, sum) {
    const transaction = new NewTransaction(uuidv4(), type, comment, sum);

    await axios.post("http://localhost:3000/transactions", { ...transaction })
      .catch(function (error) { throw Error(error) })
  };

  this.removeTransaction = async function (id) {
    await axios.delete(`http://localhost:3000/transactions/${id}`)
      .catch(function (error) { throw Error(error) })
  };

  this.updateTransaction = function (id, newDetails) {
    const transaction = this.transactionDB.find(item => item.id === id);

    if (transaction) {
      for (const key in newDetails) {
        transaction[key] = newDetails[key];
      }
    }
  };

  this.getTransactionsList = async function () {
    const response = await axios.get("http://localhost:3000/transactions");
    return response.data;
  };
};

export default MoneyTransactionManeger;