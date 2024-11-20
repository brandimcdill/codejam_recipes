/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const recipeListEl = document.querySelectorAll('.cards__list');
const appetizerListEl = document.querySelector('#appetizer-list');
const mainDishesListEl = document.querySelector('#main-dish-List');
const dessertsListEl = document.querySelector('#desserts-list');

const recipeTemplate = document.querySelector('#recipe-template').content.firstElementChild;
const addRecipeModal = document.querySelector('#recipe-modal');
const addRecipeForm = addRecipeModal.querySelector('#add-recipe-form');
const addRecipeBtn = document.querySelector('#add-recipe-btn');
const recipeTitleInput = document.querySelector('.modal__input_title');
const recipeImageInput = document.querySelector('.modal__input_url');
const recipeInstructionsInput = document.querySelector('.modal__input_text');


/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal){
    modal.classList.add('modal_opened'); // add class to modal.css
    document.addEventListener("keydown", closeModalEsc);
    modal.addEventListener("mousedown", closeOverlay);
}

function closeModal(modal){
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeOverlay);
} 

function renderRecipe(recipeData, wrapper) {
    const recipeElement = fetchRecipeElement(recipeData);
    wrapper.prepend(recipeElement);
}

function fetchRecipeElement(recipeData) {
    const recipeElement = recipeTemplate.cloneNode(true);
    const recipeImageEl = recipeElement.querySelector('.card__image');
    const recipeTitleEl = recipeElement.querySelector('.card__title');
    const recipeInstructionsEl = recipeElement.querySelector('.card__description');
    const recipeFooterEl = recipeElement.querySelector('.card__content_footer_text');
    // need to use API for recipeFooterEl

    recipeImageEl.src = recipeData.url;
    recipeImageEl.alt = recipeData.name;
    recipeTitleEl.textContent = recipeData.name;
    recipeInstructionsEl.textContent = recipeData.description;

    return recipeElement;
}

function handleAddRecipeSubmit (evt){
    evt.preventDefault();
    const newRecipe = {
        name: recipeTitleInput.value,
        url: recipeImageInput.value,
        description: recipeInstructionsInput.value
    }
    renderRecipe(newRecipe, recipeListEl)
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

addRecipeBtn.addEventListener('click', () => openModal(addRecipeModal));
addRecipeForm.addEventListener('submit', handleAddRecipeSubmit);

const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
    modal.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('modal_opened')) {
            closeModal(modal);
        }
        if (evt.target.classList.contains('modal__close')) {
          closeModal(modal);
        }
    })
})

/* -------------------------------------------------------------------------- */
/*                              Initialize Recipes                              */
/* -------------------------------------------------------------------------- */

//need to add some default recipes in an array to initialize
function intializeRecipes(array) { 
    array.forEach((recipeData) => {
        renderCard(recipeData, recipeListEl);
    });
}

intializeRecipes(appetizers);
intializeRecipes(mainDishes);
intializeRecipes(desserts);


/* -------------------------------------------------------------------------- */
/*                                Recipes Array                               */
/* -------------------------------------------------------------------------- */

/*  need to fill these out with recipes, will also need an array for each 
    menu.
*/
const appetizers =[
    {
        name: 'Pumpkin Cheese Ball',
        url: 'https://hips.hearstapps.com/hmg-prod/images/delish-202210-pumpkincheeseball-063-1666808006.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
        description: `
        Ingredients
            8 oz. cream cheese, softened to room temperature
            4 oz. fresh goat cheese, softened to room temperature
            2 c. shredded sharp cheddar (about 8 oz.)
            2 scallions, white and light green parts thinly sliced, 1 (6") dark green piece reserved
            1 medium jalapeño, cored, seeded, and finely chopped
            3 Tbsp. finely chopped chives
            1 1/2 tsp. Worcestershire sauce
            Kosher salt
            Freshly ground black pepper
            1 bell pepper
            2/3 c. Cheddar Goldfish, finely crushed
            Crackers and sliced raw vegetables, for serving

        Directions
            Step 1
            In a large bowl, stir cream cheese and goat cheese. Add cheddar, white and light green scallion parts, jalapeño, chives, and Worcestershire sauce and stir until incorporated; season with salt and pepper.
            Step 2
            Transfer cheese mixture to a large piece of plastic wrap (you may need 2 pieces), cover, and form into a large ball. Using 4 rubber bands, create ridges by wrapping them around ball, dividing into 8 sections. (You may need to wrap them multiple times if they’re too large to make an indent.) Refrigerate at least 4 hours or up to 3 days.
            Step 3
            Meanwhile, cut reserved dark scallion part into long, thin strips and place in a bowl of ice water in refrigerator. (This will cause them to curl.) When ready to use, pat dry with a paper towel.
            Step 4
            To create the pumpkin “stem,” carefully remove bell pepper stem. Slice remaining pepper for serving.
            Step 5
            Remove rubber bands and plastic wrap from cheese ball and coat in Goldfish crumbs. Transfer to a platter and press pepper stem into the top. Remove stem and place ends of curled scallions in indentation, then return stem to secure scallions in place.
            Step 6
            Let cheese ball soften to room temperature, about 30 minutes. Serve with crackers and sliced vegetables alongside. 
`
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    }
]

const mainDishes =[
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    }
]

const desserts =[
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    }
]

const recipes =[
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    },
    {
        name: '',
        url: '',
        description: ''
    }
]
