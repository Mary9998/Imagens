"use strict";
const loadGallery = (text) => {
  const imagesInfo = console.log(text);
};

//o target é onde eu estou cliando, ou seja, o valor
const handleKeyPress = ({ key, target }) => {
  if (key === "Enter") {
    loadGallery(target.value);
  }
};
//keypress é quando alguém preciona uma tecla, keyup é quando a tecla é solta e keydown é quando a tecla é pressionada e segurada
document
  .querySelector("#search-input")
  .addEventListener("keypress", handleKeyPress);
