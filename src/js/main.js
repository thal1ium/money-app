"use strict";

// Imports
import "../style/style.scss";
import MoneyTransactionManeger from "./transaction/MoneyTransactionManeger.js";
import icons from "./config/icons.config.js";
import ListItem from "./Components/ListItem/ListItem.js";
import escapeHTML from "./module/escapeHTML.js";

// Variables
let type;
let comment;
let sum;
const listItems = document.querySelector("#list");
const preloader = document.querySelector(".preloader");

let moneyTransactionManeger = new MoneyTransactionManeger();
let listItem = new ListItem();

window.addEventListener("load", () => {
  preloader.classList.add("done");

  setTimeout(() => {
    preloader.remove();
  }, 500);
})

// Functions
function main() {
  document.querySelector(".form__button").addEventListener("click", async (event) => {
    event.preventDefault();

    type = document.querySelector("#type").value;
    comment = document.querySelector("#textarea").value;
    sum = +document.querySelector("#sum").value;

    const check = dataValidityCheck(type, comment, sum);

    if (!check[0]) {
      throw new Error(`Data invalid ${check[1]}`);
    }

    await moneyTransactionManeger.addTransaction(type, comment, sum);
    await loadList();
  })
}

function deleteItem() {
  document.addEventListener("click", async (event) => {
    event.preventDefault();

    if (event.target.id === "delete") {
      const id = event.target.dataset.listId;
      await moneyTransactionManeger.removeTransaction(id);

      await loadList();
    }
  })
}

async function loadList() {
  listItems.innerHTML = '';

  try {
    const response = await moneyTransactionManeger.getTransactionsList();

    response.forEach(element => {
      listItems.innerHTML += listItem.state(element["id"], icons[element["type"]], escapeHTML(element["comment"]), element["price"]).render();
    });
  } catch (error) {
    listItems.innerHTML += `<h1 style="text-align: center; font-size: 30px;">Sorry, ${error}</h1>`;
    throw new Error(error);
  }
}

function dataValidityCheck(type, comment, sum) {
  if (!(type && icons[type])) {
    return [false, "Problem with type"];
  }

  if (!(comment.length > 0)) {
    return [false, "The comment must not be empty"];
  }

  if (isNaN(sum) || sum <= 0) {
    return [false, "The sum must be a positive number"];
  }

  return [true, "data valid"];
}

// Calling functions
loadList();
main();
deleteItem();