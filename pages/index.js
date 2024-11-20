/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const recipeListEl = document.querySelector(".cards__list");
const recipeTemplate =
  document.querySelector("#recipe-template").content.firstElementChild;
const addRecipeModal = document.querySelector("#recipe-modal");
const addRecipeForm = addRecipeModal.querySelector("#add-recipe-form");
const addRecipeBtn = document.querySelector("#add-recipe-btn");
const recipeTitleInput = document.querySelector(".modal__input_title");
const recipeImageInput = document.querySelector(".modal__input_url");
const recipeInstructionsInput = document.querySelector(".modal__input_text");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened"); // add class to modal.css
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeOverlay);
}

function renderRecipe(recipeData, wrapper) {
  const recipeElement = fetchRecipeElement(recipeData);
  wrapper.prepend(recipeElement);
}

function fetchRecipeElement(cardData) {
  const recipeElement = recipeTemplate.cloneNode(true);
  const recipeImageEl = recipeElement.querySelector(".card__image");
  const recipeTitleEl = recipeElement.querySelector(".card__title");

  recipeImageEl.src = cardData.link;
  recipeImageEl.alt = cardData.name;
  recipeTitleEl.textContent = cardData.name;

  return recipeElement;
}

function handleAddRecipeSubmit(evt) {
  evt.preventDefault();
  const newRecipe = {
    name: recipeTitleInput.value,
    url: recipeImageInput.value,
    description: recipeInstructionsInput.value,
  };
  renderRecipe(newRecipe, recipeListEl);
  evt.target.reset();
  closeModal(addRecipeModal);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

addRecipeBtn.addEventListener("click", () => openModal(addRecipeModal));
addRecipeForm.addEventListener("submit", handleAddRecipeSubmit);

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                              Initialize Recipes                              */
/* -------------------------------------------------------------------------- */

//need to add some default recipes in an array to initialize
recipes.forEach((recipeData) => {
  renderCard(recipeData, recipeListEl);
});

/* -------------------------------------------------------------------------- */
/*                                Recipes Array                               */
/* -------------------------------------------------------------------------- */

const recipes = [
  {
    name: "",
    url: "",
    description: "",
  },
  {
    name: "",
    url: "",
    description: "",
  },
  {
    name: "",
    url: "",
    description: "",
  },
  {
    name: "",
    url: "",
    description: "",
  },
  {
    name: "",
    url: "",
    description: "",
  },
  {
    name: "",
    url: "",
    description: "",
  },
];
