"use strict";

import "../style/style.scss";
import MoneyTransactionManeger from "./transaction/MoneyTransactionManeger.js";
import icons from "./config/icons.config.js";

let type;
let comment;
let sum;
const listItems = document.querySelector("#list");

let moneyTransactionManeger = new MoneyTransactionManeger();

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
      console.log(element);
      listItems.innerHTML += listItem(element["id"], icons[element["type"]], element["comment"], element["price"]);
    });
    console.log("data loaded");
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

function listItem(id, icon, comment, sum) {
  return ` <li class="list__item item">
  <div class="item__wrapper">
    <div class="item__type" style="background-color: ${icon[1]}">
      <img class="item__img" style="max-height: 40px; max-width: 40px;" src="./src/img/icons/${icon[0]}.png">
    </div>
    <p class="item__comment">${comment}</p>
    <p class="item__price">
      Sum: ${sum}
    </p>
  </div>
  <button data-list-id="${id}" type="button" id="delete">
    <svg style="pointer-events: none;" width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000"
        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
    </svg>
  </button>
</li>`
}

loadList();
main();
deleteItem();