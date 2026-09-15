"use strict";
const searchImages = async (text) => {
  const key = "57606088-0b7544a690264f460cd57a29b";
  const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
  const response = await fetch(url);
  return response.json();
  //estou pegando apenas o json
};
const createLink = (tag) => `
    <a hrfe="#">
    ${tag}
    </a>
`;

const createCard = ({ webformatURL }) => {
  const card = document.createElement("div");
  card.classList.add("card-container");
  card.innerHTML = `
  <a href= "# card-img>
  <img src=${webformatURL}>
  </a>
  `;

  return card;
};

const loadGallery = async (text) => {
  const container = document.querySelector(".container-gallery");
  const { hits } = await searchImages(text);
  const cards = hits.map(createCard);
  container.replaceChildren(...cards);
  console.log(cards);
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
