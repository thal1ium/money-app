"use strict";

import "../style/style.scss";
import MoneyTransactionManeger from "./transaction/MoneyTransactionManeger.js";
import icons from "./config/icons.config.js";

let type;
let comment;
let sum;
const listItems = document.querySelector("#list");



function listItem(icon, comment, sum) {
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
  <button type="button" id="delete">
    <svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000"
        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
    </svg>
  </button>
</li>`
}

const moneyTransactionManeger = new MoneyTransactionManeger();

async function loadList() {
  const response = await moneyTransactionManeger.getTransactionsList();

  response.data.forEach(element => {
    console.log(element);
  });
}

document.querySelector(".form__button").addEventListener("click", (event) => {
  event.preventDefault();

  type = document.querySelector("#type").value;
  comment = document.querySelector("#textarea").value;
  sum = +document.querySelector("#sum").value;

  if (!(type && icons[type])) {
    return console.log("Problem with type");
  }

  if (!(comment.length > 0)) {
    return console.log("the comment must not be empty");
  }

  moneyTransactionManeger.addTransaction(type, comment, sum);

  listItems.innerHTML += listItem(icons[type], comment, sum);

})

loadList();