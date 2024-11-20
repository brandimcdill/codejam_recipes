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
    // need to change the function from the point below so it will place card in right list
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

function intializeRecipes(array, wrapper) { 
    array.forEach((recipeData) => {
        renderRecipe(recipeData, wrapper);
    });
}
// callback of this function are at the bottom of the file so they may use the arrays below


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
        name: 'Brushetta',
        url: '',
        description: `
        Ingredients
            Tomatoes
            1/4 c. extra-virgin olive oil
            2 cloves garlic, thinly sliced
            4 large tomatoes, finely chopped
            Kosher salt 
            1/4 c. thinly sliced fresh basil
            2 Tbsp. balsamic vinegar 
            Pinch of crushed red pepper flakes
            Bread & Assembly
            1 large baguette, sliced 1/4" thick on the bias
            Extra-virgin olive oil, for brushing
            2 cloves garlic, halved

        Directions
            Tomatoes
            Step 1
            In a medium skillet over medium-low heat, heat oil. Add garlic and cook, stirring occasionally, until lightly golden, 2 to 4 minutes. Let cool.
            Step 2
            Meanwhile, set a large strainer or colander over a bowl. Add tomatoes and toss with 1/2 teaspoon salt.
            Step 3
            Let sit 5 minutes. Transfer tomatoes to a large bowl. Add basil, vinegar, crushed red pepper flakes, and 1/2 tsp. salt and toss to combine. Add garlic and oil from skillet and toss again to combine. Let marinate at least 30 minutes or up to 2 days
            Bread & Assembly
            Step 1
            Preheat oven to 400°. Brush bread on both sides with oil and arrange on large baking sheet. 
            Step 2
            Toast bread, turning halfway through, until dried and golden brown, 10 to 15 minutes. Let cool 5 minutes, then rub one side of bread with halved garlic cloves.
            Step 3
            Arrange bread on a platter and spoon tomatoes on garlic-rubbed side of bread just before serving 
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
];


intializeRecipes(appetizers, appetizerListEl);
intializeRecipes(mainDishes, mainDishesListEl);
intializeRecipes(desserts, dessertsListEl);