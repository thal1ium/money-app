class ListItem {
  state = (id, icon, comment, sum) => {
    this.id = id;
    this.icon = icon;
    this.comment = comment;
    this.sum = sum;

    return this;
  };

  escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, (tag) => {
      const charsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      };
      return charsToReplace[tag] || tag;
    });
  };

  render = () => {
    return (`
    <li class="list__item item">
      <div class="item__wrapper">
        <div class="item__type" style="background-color: ${this.icon[1]}">
          <img class="item__img" style="max-height: 40px; max-width: 40px;" src="./src/img/icons/${this.icon[0]}.png">
        </div>
        <p class="item__comment">${this.escapeHTML(this.comment)}</p>
        <p class="item__price">
          Sum: ${this.sum}
        </p>
      </div>
      <button data-list-id="${this.id}" type="button" id="delete">
        <svg style="pointer-events: none;" width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000000"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
        </svg>
      </button>
    </li>`);
  };
}

export default ListItem;

