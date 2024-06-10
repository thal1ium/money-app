"use strict";

import "../style/style.scss";
import { v4 as uuidv4 } from 'uuid';

let type;
let comment;
let sum;

const icons = {
  alcohol: ["alcohol", "#ffcccb"], // Light Red
  clothing: ["clothing", "#dcdcdc"], // Light Gray
  education: ["education", "#87ceeb"], // Light Blue
  food: ["food", "#ffd700"], // Gold
  games: ["games", "#add8e6"], // Light Blue
  health: ["health", "#98fb98"], // Pale Green
  shopping: ["shopping", "#ffb6c1"], // Light Pink
  sports: ["sports", "#f08080"], // Light Coral
  transport: ["transport", "#d3d3d3"], // Light Gray
  travel: ["travel", "#dda0dd"], // Plum
  finance: ["finance", "#8fbc8f"], // Dark Sea Green
  utilities: ["utilities", "#ffa07a"], // Light Salmon
  entertainment: ["entertainment", "#e0e0e0"], // Light Gray
  dining: ["dining", "#ffe4b5"], // Moccasin
  personalCare: ["personalCare", "#f0e68c"], // Khaki
  home: ["home", "#afeeee"], // Pale Turquoise
  misc: ["misc", "#f5f5f5"] // White Smoke
};

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

  const transaction = new NewTransaction(uuidv4(), type, comment, sum);

  console.log(transaction);

  document.querySelector("#list").innerHTML += listItem(icons[type], comment, sum);

})

function listItem (icon, comment, sum) {
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

// Crud 

function NewTransaction(id, type, comment, price) {
  this.id = id;
  this.type = type;
  this.comment = comment;
  this.price = price;
};

function MoneyTransactionManeger() {
  this.transactionDB = []

  this.addTransactio = function (student) {
    this.studentsDB.push(student);
  };

  this.removeTransaction = function (id) {
    this.transactionDB = this.studentsDB.filter(item => item.id !== id);
  };

  this.updateTransaction = function (id, newDetails) {
    const transaction = this.transactionDB.find(item => item.id === id);

    if (transaction) {
      for (const key in newDetails) {
        transaction[key] = newDetails[key];
      }
    }
  };

  this.getTransactionsList = function () {
    return this.transactionDB;
  };
};

// 