"use strict";
const searchImages = async (text) => {
  const key = "57606088-0b7544a690264f460cd57a29b";
  const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
  const response = await fetch(url);
  return response.json();
  //estou pegando apenas o json
};
const createLink = (tag) => `
    <a hrfe="#" onClick="loadGallery('${tag}')">
    ${tag}
    </a>
`;

const createCard = ({ webformatURL, pageURL, tags, likes, comments }) => {
  const card = document.createElement("div");
  card.classList.add("card-container");
  card.innerHTML = `
        <a href="${pageURL}" class="card-image">
            <img src=${webformatURL} >
        </a>
        <div class="card-info">
            <div class="card-tags">
               ${tags.split(",").map(createLink).join("")}
            </div>
            <div class="card-action">  
                <div class="card-like">
                    <i class="far fa-thumbs-up"></i>
                    <span>${likes}</span>
                </div>
                <div class="card-comment">
                    <i class="far fa-comment"></i>
                    <span>${comments}</span>
                </div>
                <div class="card-save">
                    <i class="far fa-bookmark"></i>
                </div>
            </div>

        </div>
    `;

  return card;
};

const loadGallery = async (text, page = 1) => {
  const container = document.querySelector(".container-gallery");
  const { hits, totalHits } = await searchImages(`${text}&page=${page}`);
  const cards = hits.map(createCard);
  container.replaceChildren(...cards);
  document.querySelector("#search-input").value = text;

  const totaPages = Math.ceil(totalHits / 20);
  document.querySelector("#page-total").textContent = `/ ${totaPages}`;
  document.querySelector("#search-input").value = text;
  document.querySelector("#page").value = page;
};

//o target é onde eu estou cliando, ou seja, o valor
const handleKeyPress = ({ key, target }) => {
  if (key === "Enter") {
    loadGallery(target.value);
  }
};

const handlePage = ({ key, target }) => {
  const text = document.querySelector("#search-input").value;
  if (key === "Enter") {
    loadGallery(text, target.value);
  }
};

const handleNext = () => {
  let page = Number(document.querySelector("#page").value);
  const totalPages = Number(
    document.querySelector("#page-total").textContent.replace("/", ""),
  );
  const text = document.querySelector("#search-input").value;
  if (page < totalPages) {
    page++;
    loadGallery(text, page);
  }
};

const handlePrevious = () =>{
  let page = Number(document.querySelector("#page").value);
  const text = document.querySelector("#search-input").value;
  if (page > 1) {
    page--;
    loadGallery(text, page);
  }
};

//keypress é quando alguém preciona uma tecla, keyup é quando a tecla é solta e keydown é quando a tecla é pressionada e segurada
document
  .querySelector("#search-input")
  .addEventListener("keypress", handleKeyPress);
document.querySelector("#page").addEventListener("keypress", handlePage);
document.querySelector("#page-next").addEventListener("click", handleNext);
document.querySelector("#page-previous").addEventListener("click", handlePrevious);