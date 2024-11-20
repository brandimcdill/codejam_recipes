/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const appetizerListEl = document.querySelector("#appetizer-list");
const mainDishesListEl = document.querySelector("#main-dish-list");
const dessertsListEl = document.querySelector("#desserts-list");
const recipeTemplate = document.querySelector("#recipe-template").content.firstElementChild;
const addRecipeModal = document.querySelector("#recipe-modal");
const addRecipeForm = addRecipeModal.querySelector("#add-recipe-form");
const addRecipeBtn = document.querySelector("#add-recipe-btn");
const recipeTitleInput = document.querySelector(".modal__input_title");
const recipeImageInput = document.querySelector(".modal__input_url");
const recipeInstructionsInput = document.querySelector(".modal__input_text");
const recipeRadioInput = document.querySelectorAll('input[name="menuSelect"]');
let menuChoice = "";
const appsLink = document.querySelector("#appsLink");
const mainDishLink = document.querySelector("#mainDishLink");
const dessertsLink = document.querySelector("#dessertsLink");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal){
    modal.classList.add('modal_opened');
    document.addEventListener("keydown", closeModalEsc);
    modal.addEventListener("mousedown", closeOverlay);
}

function closeModal(modal){
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeOverlay);
    addRecipeForm.reset();
} 

function renderRecipe(recipeData, wrapper) {
    const recipeElement = fetchRecipeElement(recipeData);
    wrapper.prepend(recipeElement);
}

function fetchRecipeElement(recipeData) {
  const recipeElement = recipeTemplate.cloneNode(true);
  const recipeImageEl = recipeElement.querySelector(".card__image");
  const recipeTitleEl = recipeElement.querySelector(".card__title");
  const recipeInstructionsEl = recipeElement.querySelector(".card__description");
  const recipeFooterEl = recipeElement.querySelector(".card__content_footer_text");
  // need to use API for recipeFooterEl

  recipeImageEl.src = recipeData.url;
  recipeImageEl.alt = recipeData.name;
  recipeTitleEl.textContent = recipeData.name;
  recipeInstructionsEl.textContent = recipeData.description;

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
    if (menuChoice === "appetizers") {
        renderRecipe(newRecipe, appetizerListEl);
    } else if (menuChoice === "mainDishes") {
        renderRecipe(newRecipe, mainDishesListEl);
    } else if (menuChoice === "desserts") {
        renderRecipe(newRecipe, dessertsListEl);
    }
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

  function toggleContent(evt) {
    if (evt.target.id === "appsLink") {
        appetizerListEl.style.display = "grid";
        mainDishesListEl.style.display = "none";
        dessertsListEl.style.display = "none";
    }
    if (evt.target.id === "mainDishLink") {
        appetizerListEl.style.display = "none";
        mainDishesListEl.style.display = "grid";
        dessertsListEl.style.display = "none";
    }
    if (evt.target.id === "dessertsLink") {
        appetizerListEl.style.display = "none";
        mainDishesListEl.style.display = "none";
        dessertsListEl.style.display = "grid";
    }

  }

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

addRecipeBtn.addEventListener('click', () => openModal(addRecipeModal));
addRecipeForm.addEventListener('submit', handleAddRecipeSubmit);

  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeModal(modal);
      }
      if (evt.target.classList.contains("close_btn")) {
        closeModal(modal);
      }
    });
  });

  recipeRadioInput.forEach(function (radio) {
    radio.addEventListener("change", function () {
      menuChoice = radio.value;
    });
  });

  appsLink.addEventListener("click", (evt) => toggleContent(evt));
  mainDishLink.addEventListener("click", (evt) => toggleContent(evt));
  dessertsLink.addEventListener("click", (evt) => toggleContent(evt));

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
  // All recipes and images in the default recipe arrays are property of delish.com
  const appetizers = [
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
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a41043084/pumpkin-cheese-ball-recipe/.
`
    },
    {
        name: 'Brushetta',
        url: 'https://hips.hearstapps.com/hmg-prod/images/bruschetta-lead-645d03e6eb7ff.jpg?crop=1xw:1xh;center,top&resize=1200:*',
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
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a27409128/best-bruschetta-tomato-recipe/
        `
    },
    {
        name: 'Greek Feta Dip',
        url: 'https://hips.hearstapps.com/hmg-prod/images/loaded-greek-feta-dip-lead-65eb3db9b6bff.jpg?crop=0.9996875xw:1xh;center,top&resize=980:*',
        description: `
        Ingredients
            12 oz. feta
            1 c. Greek yogurt
            1 (8-oz.) block cream cheese, softened
            1/4 c. extra-virgin olive oil, plus more for drizzling
            Juice and zest of 1 lemon
            Kosher salt
            2 Tbsp. freshly chopped dill, plus more for garnish
            Pinch crushed red pepper flakes
            1/2 c. chopped cucumber
            1/2 c. halved cherry tomatoes
            Whole grain pita chips, for serving

        Directions
            Step 1
            Using a handheld mixer on medium-high speed, in a large bowl, beat feta, yogurt, cream cheese, oil, lemon zest, and lemon juice until fluffy and combined; season with salt. Add dill and crushed red pepper flakes and stir to combine.
            Step 2
            Transfer dip to a serving bowl. Top with cucumber, tomatoes, dill, and a drizzle of oil. Serve with chips alongside.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/recipes/a50968/greek-feta-dip-recipe/
        `
    },
    {
        name: 'Melon Prosciutto Skewers',
        url: 'https://hips.hearstapps.com/hmg-prod/images/melon-prosciutto-skewers-lead-66057c047c96a.jpg?crop=1xw:1xh;center,top&resize=980:*',
        description: `
        Ingredients
            1 cantaloupe
            12 fresh basil leaves
            8 oz. mozzarella balls (ciliegine)
            12 slices prosciutto
            Balsamic glaze, for drizzling

        Directions
            Step 1
            Halve cantaloupe, then scoop out and discard seeds. Using a melon baller, scoop out 24 balls.
            Step 2
            Assemble skewers: Layer cantaloupe, basil, mozzarella, prosciutto, and a second piece of cantaloupe until you have 12 skewers.
            Step 3
            Drizzle skewers with balsamic glaze and serve immediately.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/recipes/a53065/melon-prosciutto-skewers-recipe/
        `
    },
    {
        name: 'Slow-Cooker Crab Dip',
        url: 'https://hips.hearstapps.com/del.h-cdn.co/assets/15/45/1446765266-delish-slowcooker-crab-dip.jpg?resize=980:*',
        description: `
        Ingredients
            12 oz. cream cheese
            1/2 c. freshly grated Parmesan, plus more for garnish
            1/2 c. mayonnaise
            1/2 c. thinly sliced green onions, plus more for garnish
            2 cloves garlic, minced
            Juice of 1 lemon
            1 1/2 Tbsp. Worcestershire sauce
            1 1/2 tsp. Old Bay seasoning, plus more for garnish
            12 oz. canned crab meat (drained and flaked)
            RITZ Crackers, for serving

        Directions
            Step 1
            In a  1 1/2 quart slow-cooker, combine cream cheese, Parmesan, mayonnaise, green onions, garlic, lemon juice, Worcestershire, and Old Bay and stir until combined.
            Step 2
            Fold in crab meat and cook on low, 2 hours.
            Step 3
            Garnish with Parm, green onions, and Old Bay. Serve with crackers.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/recipes/a44678/slow-cooker-crab-dip-recipe/
        `
    },
    {
        name: 'Cranberry Brie Jalapeno Poppers',
        url: 'https://hips.hearstapps.com/hmg-prod/images/cranberry-brie-jalapen-o-poppers-lead-654eb2a3ad0b7.jpg?crop=1xw:1xh;center,top&resize=980:*',
        description: `
        Ingredients
            (8-oz.) brie wheel, chopped into small pieces
            1 1/2 c. shredded mozzarella
            1 clove garlic, minced
            Kosher salt 
            Freshly ground black pepper 
            1 (14-oz.) can whole cranberry sauce
            12  jalapeños

        Directions
            Step 1
            Preheat oven to 400°. In a large bowl, combine brie, mozzarella, and garlic. Season with salt and pepper. Add ½ the can of cranberry sauce and fold throughout, don’t fully combine. 
            Step 2
            Halve jalapeños lengthwise, then use a small spoon to remove seeds and veins. Fill with cheese mixture and wrap each with a halved slice of prosciutto.
            Step 3
            Place on a baking sheet and bake until prosciutto is crispy and peppers are tender, about 25 minutes. Serve warm with remaining cranberry sauce.
            prosciutto, halved lengthwise 
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a34702463/cranberry-brie-jalapeno-poppers-recipe/
        `
    }
]

const mainDishes =[
    {
        name: 'Stuffed Turkey Breast',
        url: 'https://hips.hearstapps.com/hmg-prod/images/stuffed-turkey-breast-recipe-1-6524600715f14.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
        description: `
        Ingredients
            For the turkey:
            1/4 c. salted butter, softened
            4 garlic cloves, grated
            1 Tbsp. chopped fresh sage
            1 tsp. poultry seasoning
            1 tsp. lemon zest
            4 slices thick-cut bacon
            1 medium onion, chopped
            2 stalks celery, diced
            1 tsp. kosher salt, plus more for sprinkling
            1 tsp. ground black pepper, plus more for sprinkling and serving
            1 honeycrisp apple, diced
            1 small bunch kale, stemmed and chopped (about 3 cups)
            1/4 c. white wine
            1 Tbsp. fresh lemon juice
            2 Tbsp. chopped fresh parsley, plus more for serving
            2 1/2 c. dry seasoned stuffing mix
            1 (4-oz.) piece cornbread, crumbled (1 cup)
            1/2 c. turkey or chicken broth
            1 bone-in skin-on turkey breast roast (5 to 7 pounds)
            Kitchen twine
            For the gravy:
            3 Tbsp. all-purpose flour
            2 c. turkey or chicken broth, warm
            Kosher salt, to taste
            Ground black pepper, to taste

        Directions
            1For the turkey: Preheat the oven to 350°F.
            2In a small bowl, mash the butter with the garlic, sage, poultry seasoning, and lemon zest until well combined.
            3In a large saute pan over medium-high heat, cook the bacon, turning as needed, until the fat has rendered and the bacon is golden and crispy, 8 to 10 minutes. Transfer the bacon to a paper towel-lined plate. When cool enough to handle, crumble the bacon into bite-sized pieces. Drain the fat and wipe out the pan.
            4In the same pan over medium heat, melt 2 tablespoons of the butter mixture. Add the onion, celery, 1 teaspoon of salt, and 1 teaspoon of pepper and cook until translucent, 3 to 4 minutes. Add the apple and kale and cook until the apples soften slightly and the kale begins to wilt. Add the wine and lemon juice and cook until the wine is reduced by about half, 2 to 3 minutes. Stir in the parsley. Remove the mixture to a large bowl.
            5To the large bowl with the vegetables, add the stuffing mix, crumbled cornbread, and crumbled bacon, tossing to combine. Pour in the broth and stir until the bread is no longer dry and everything is well combined.
            6On a large cutting board, place the turkey breast skin-side down. Use a boning knife, a sharp, small knife, or kitchen shears to cut out and remove the back bone. Save these bones for stock. Using the knife, cut along the ribs and the keel bone to remove the large piece of sternum bone from the meat. Work slowly, feeling along where the bone is connected to the breast meat to ensure you’re cutting as close to the bone as possible to avoid cutting into the meat. Keep slicing close to the bone, working your way down and in towards the center of the breast roast until you can lift the keel bone from the roast. Cut out the tenders and reserve. Starting from the center, butterfly both of the breasts by inserting the knife into the side of the breast and cutting it in half horizontally until it is almost cut in half and can be opened like a book.
            7Pat the entire turkey down with paper towels. Place the turkey breast skin-side down. Place the tenders in the center of the roast where there will be a curve. If the roast seems thick, cover it in plastic wrap and pound it with a meat tenderizer until flattened and even (about ½ inch). Rub the surface of the turkey with 2 tablespoons of the butter mixture and sprinkle with salt and pepper. Spread the stuffing mixture in an even layer, leaving a ½-inch border all around. Starting with one long side, tightly roll the turkey into a log and place seam-side down on the board. Use kitchen twine to tie the roll once down the entire length of the turkey and around the width at approximately 2-inch intervals.
            8Rub the entire roast with the remaining butter mixture and sprinkle with salt and pepper. Place the roast seam-side down on a rack set in a roasting pan.
            9Roast until the turkey is golden brown and crispy and the internal temperature is 160°F, 1 hour 10 minutes to 1 hour 30 minutes. Remove the turkey from the pan and place on a carving board, covered in foil, to rest.
            10For the gravy: Remove the rack from the roasting pan and place the pan over medium heat. Whisk the flour into the drippings and cook, stirring frequently, until the roux is golden brown. Gradually add the stock, whisking to break up any clumps. Bring to a gentle simmer. Cook, whisking frequently, until the gravy is smooth and thickened, about 3 minutes. Add salt and pepper to taste.
            11Cut the twine off the turkey and slice. Serve with warm gravy and extra parsley and black pepper, if you'd like.
        Recipe link:https://www.thepioneerwoman.com/food-cooking/recipes/a44902220/stuffed-turkey-breast-turkey-roulade-recipe/
        `
    },
    {
        name: 'Shaved Brussels Sprouts with Bacon and Warm Apple Cider Dressing',
        url: 'https://hips.hearstapps.com/hmg-prod/images/shaved-brussels-sprouts-with-bacon-1661454514.jpg?crop=0.816xw:0.681xh;0.109xw,0.167xh&resize=1200:*',
        description: `
        Ingredients
            1/4 c. fresh apple cider
            1 Tbsp. Dijon mustard
            1 Tbsp. whole grain mustard
            2 Tbsp. apple cider vinegar
            1 Tbsp. olive oil
            Kosher salt and freshly ground black pepper
            3 slices thick-cut bacon, thinly sliced
            1 shallot, thinly sliced
            1 lb. Brussels sprouts, trimmed and thinly sliced
            2 thyme sprigs
            1/2 c. roughly chopped pecans, toasted

        Directions
            Step 1
            Whisk together cider, Dijon, whole grain mustard, vinegar, and oil in a bowl. Season with salt and pepper. 
            Step 2
            Cook bacon in a large skillet over medium heat, stirring occasionally, until crisp, 6 to 8 minutes. Transfer bacon to a bowl, and pour off all but 2 tablespoons fat. Add shallot to skillet and season with salt and pepper. Cook, stirring occasionally, just until starting to soften, about 1 minute. Add Brussels sprouts and thyme. Season with salt and pepper. Cook, stirring occasionally, just until tender, 4 to 6 minutes; transfer to the bowl with bacon. 
            Step 3
            Add dressing to skillet and cook, scraping up any brown bits from the bottom of the skillet, just until starting to thicken, 30 seconds to 1 minute. Return bacon and Brussels sprouts to skillet and toss to coat. Discard thyme. Serve warm topped with pecans.
        Recipe link: https://www.countryliving.com/food-drinks/a40993149/shaved-brussels-sprouts-warm-apple-cider/
        `
    },
    {
        name: 'Bourbon Yams',
        url: 'https://hips.hearstapps.com/hmg-prod/images/bourbon-yams-1634058469.jpg?crop=1.00xw:1.00xh;0,0.00136xh&resize=1200:*',
        description: `
        Ingredients
            6 Tbsp. unsalted butter, at room temperature, divided, plus more for dish
            6 sweet potatoes (4 pounds)
            1/4 c. bourbon or whiskey
            4 Tbsp. brown sugar
            Kosher salt
            1 c. pecans, chopped
            3/4 tsp. ground cinnamon

        Directions
            Step 1
            Preheat oven to 400°F. Lightly butter a 2-quart baking dish. Roast potatoes on a rimmed baking sheet until a knife easily inserts into centers, 1 hour. Cool enough to handle, then remove and discard skins. Coarsely chop potatoes. Reduce oven temperature to 375°F. 
            Step 2
            Mash together potatoes, bourbon, 2 tablespoons butter, and 1 tablespoon sugar in a bowl. Season with salt. Transfer to prepared baking dish. Combine pecans, cinnamon, remaining 4 tablespoons butter, and 3 tablespoons sugar in a second bowl. Sprinkle over potatoes. 
            Step 3
            Bake until bubbly and warmed through, 30 to 35 minutes.
        Recipe link: https://www.countryliving.com/food-drinks/a37938138/bourbon-yams-recipe/
        `
    },
    {
        name: 'Cranberry-Grape Sauce',
        url: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/16/40/1475592450-gallery-1475529277-clx110116-cranberry-recipe.jpg?crop=1.00xw:0.834xh;0,0.0409xh&resize=1200:*',
        description: `
        Ingredients
            1 shallot, chopped
            2 Tbsp. extra-virgin olive oil
            2 c. fresh cranberries
            2 c. seedless black grapes, halved
            1/2 c. ruby port
            1/4 c. fresh orange juice
            2 tsp. orange zest
            Kosher salt
            Freshly ground black pepper

        Directions
            Step 1
            Cook shallot in olive oil in a large skillet over medium-high heat until soft, 1 to 2 minutes. Add cranberries and grapes; cook, stirring occasionally, until cranberries just begin to burst, 3 to 4 minutes.
            Step 2
            Add port and orange juice; cook, stirring occasionally, until cranberries have burst and sauce is thickened, 10 to 12 minutes.
            Step 3
            Stir in orange zest. Season with salt and pepper. Serve warm or at room temperature.
        Recipe link: https://www.countryliving.com/food-drinks/recipes/a40031/cranberry-grape-sauce-recipe/
        `
    },
    {
        name: 'Oyster Stuffing with Bacon-Scallion Cream Sauce',
        url: 'https://hips.hearstapps.com/hmg-prod/images/oyster-stuffing-1634057154.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
        description: `
        Ingredients
            For stuffing:
            1/2 c. (1 stick) unsalted butter, plus more for baking dish
            1 (16-ounce) container (about 2 dozen, preferably Eastern Virginia) shucked oysters with their liquor, finely chopped
            12 oz. stale bread, cut into 1/2-inch cubes
            3 oz. Parmesan, grated (about 1/2 cup)
            3 slices bacon, chopped
            4 stalks celery, chopped
            1 onion, chopped
            2 Tbsp. fresh oregano, chopped
            1 Tbsp. fresh thyme, chopped
            6 fresh sage leaves, minced
            2 tsp. ground coriander
            1 1/2 c. chicken stock, plus more for binding
            Kosher salt and freshly ground black pepper
            For cream sauce:
            3 Tbsp. butter
            2 slices bacon, chopped
            3 Tbsp. all-purpose flour
            1 1/2 c. chicken stock
            3/4 c. heavy cream
            1 Tbsp. cracked peppercorns
            6 scallions, sliced
            Kosher salt


        Directions
            Step 1
            Make stuffing: Preheat oven to 350°F. Butter a 3-quart baking dish. Combine oysters and their liquor, bread, and cheese in a bowl. Melt butter in a large skillet over medium heat. Add bacon and cook until fat has rendered and bacon is cooked through but not crisp, 3 to 5 minutes. 
            Step 2
            Stir in celery and onion and cook until vegetables are soft, 10 to 12 minutes. Add oregano, thyme, sage, and coriander and stir to combine. Remove from heat. Add to bread mixture; add stock and toss to combine. Season with salt and pepper. 
            Step 3
            Transfer mixture to prepared baking dish. Bake, covered, until warmed through and bubbly, 40 to 45 minutes. Uncover and bake until golden brown, 10 to 15 minutes. 
            Step 4
            Make Bacon-Scallion Cream Sauce: Melt butter in a medium saucepan over medium heat. Add bacon and cook until rendered, 3 to 5 minutes. Reduce heat to low. Add flour, and cook, stirring often, until golden and fragrant, 4 to 6 minutes. Stir in chicken stock and heavy cream. Simmer until reduced to a thick, pourable gravy, 8 to 10 minutes. Remove from heat. Stir in cracked peppercorns and scallions. Season with kosher salt. Serve hot garnished with sliced scallions.
        Recipe link: https://www.countryliving.com/food-drinks/a37937894/oyster-stuffing-with-bacon-scallion-cream-sauce-recipe/
        `
    },
    {
        name: 'Mile-High Flaky Biscuits',
        url: 'https://hips.hearstapps.com/hmg-prod/images/mile-high-flaky-biscuits-cl-0418-1519922973.jpg?crop=1xw:0.99975xh;center,top&resize=1200:*',
        description: `
        Ingredients
            4 c. all-purpose flour, spooned and leveled, plus more for working
            4 tsp. baking powder
            1 1/2 tsp. kosher salt
            1 tsp. baking soda
            3/4 c. cold unsalted butter, cut up
            1 1/2 c. buttermilk

        Directions
            Step 1
            Preheat oven to 450°F. Whisk together flour, baking powder, salt, and baking soda in a bowl. Cut butter into flour with a pastry blender or two forks until mixture resembles small peas. Stir in buttermilk with a fork until dough begins to form a ball. Turn dough out onto a lightly floured work surface; knead 2 or 3 times, gradually adding additional flour as needed to prevent sticking.
            Step 2
            With floured hands, pat dough into a 1-inch-thick circle. Cut dough into fourths and stack one on top of another. Roll stacked dough into a 1-inch-thick circle. Repeat procedure 3 more times. Use a 2 1/2-inch round cutter to cut biscuits, pressing scraps together once. Place biscuits, slightly touching, on a baking sheet. Chill 15 minutes.
            Step 3
            Bake until golden brown, 18 to 20 minutes.
        Recipe link: https://www.countryliving.com/food-drinks/a19040029/mile-high-flaky-biscuits-recipe/
        `
    }
]

const desserts =[
    {
        name: 'Cranberry Bliss Cupcakes',
        url: 'https://hips.hearstapps.com/hmg-prod/images/cranberry-bliss-cupcakes-third-6706ce27e3b01.jpg?crop=1xw:1xh;center,top&resize=980:*',
        description: `
        Ingredients
            Sugared Cranberries
            3/4 c. (140 g.) superfine sugar, divided
            1 1/2 c. fresh cranberries
            Cupcakes
            1 1/2 c. (180 g.) all-purpose flour
            1 1/2 tsp. baking powder
            1/2 tsp. kosher salt
            1 c. (200 g.) granulated sugar
            1/2 c. (1 stick) unsalted butter, room temperature
            1 Tbsp. finely grated orange zest
            2 large eggs
            1/2 c. sour cream
            1 1/2 tsp. pure vanilla extract
            3/4 c. sweetened, dried cranberries, chopped
            White Chocolate Frosting & Assembly
            1/2 c. (1 stick) unsalted butter, room temperature
            4 oz. cream cheese
            1/4 tsp. kosher salt
            4 oz. white chocolate, melted, cooled
            1 1/2 c. (170 g.) confectioners' sugar
            Finely grated orange zest, for garnish

        Directions
            Sugared Cranberries
            Step 1
            In a medium saucepan over high heat, bring 1/2 c. superfine sugar and 1/2 c. water to a boil, stirring, until sugar is dissolved. Remove from heat, add cranberries, and stir until well coated.
            Step 2
            Using a slotted spoon, transfer cranberries to a wire rack set in a baking sheet. Let dry, about 1 hour.
            Step 3
            Place remaining 1/4 c. superfine sugar in a shallow dish. Toss cranberries, a few at a time, in sugar until coated. Return to rack and let dry completely, about 1 hour.
            Step 4
            Make Ahead: Sugared cranberries can be made 3 days ahead. Store in an airtight container and refrigerate.
            Cupcakes
            Step 1
            Arrange rack in center of oven; preheat to 350°. Line a standard 12-cup muffin tin with liners. In a medium bowl, whisk flour, baking powder, and salt.
            Step 2
            In the large bowl of a stand mixer fitted with the whisk attachment (or using a large bowl and a handheld mixer), beat granulated sugar, butter, and orange zest on medium-high speed until light and fluffy. Add eggs, one at a time, beating to blend after each addition. Add sour cream and vanilla and beat until combined.
            Step 3
            With the mixer on low speed, gradually beat in dry ingredients. Fold in dried cranberries. Fill prepared cups about three-quarters full with batter.
            Step 4
            Bake cupcakes until a tester inserted into the center comes out clean, 20 to 22 minutes. Transfer cupcakes to a wire rack and let cool.
            White Chocolate Frosting & Assembly
            Step 1
            In the large bowl of stand mixer fitted with the whisk attachment (or using a large bowl and handheld mixer), beat butter, cream cheese, and salt on medium-high speed until smooth, about 2 minutes. Slowly beat in melted chocolate. Gradually add confectioners’ sugar and beat until smooth.
            Step 2
            Spread frosting onto cupcakes. Garnish with orange zest and sugared cranberries.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a62121995/cranberry-bliss-cupcakes-recipe/
        `
    },
    {
        name: 'Pecan Pie Cheesecake Bars',
        url: 'https://hips.hearstapps.com/hmg-prod/images/pecan-pie-cheesecake-bars-lead-6706f27f91f09.jpg?crop=1xw:0.9997508098679292xh;center,top&resize=1200:*',
        description: `
        Ingredients
            Crust
            14 graham crackers
            5 Tbsp. unsalted butter, melted
            2 Tbsp. packed light brown sugar
            Pinch of kosher salt
            Cheesecake
            2 (8-oz.) pkg. cream cheese, softened
            2/3 c. (145 g.) packed light brown sugar
            1/4 c. (2 oz.) sour cream
            2 large eggs
            2 Tbsp. all-purpose flour
            1 tsp. pure vanilla extract
            1/2 tsp. ground cinnamon
            1/4 tsp. kosher salt
            Pecan Topping
            1/2 c. (110 g.) packed light brown sugar
            3 Tbsp. unsalted butter
            1 c. (125 g.) roasted, salted pecans
            1/4 c. heavy cream
            1/2 tsp. ground cinnamon
            Pinch of kosher salt

        Directions
            Crust
            Step 1
            Arrange a rack in center of oven; preheat oven to 350°. Line a 9" x 9" baking pan with parchment, leaving a 2" overhang on 2 opposite sides.
            Step 2
            Place crackers in a large resealable bag or food processor. Crush with a heavy skillet or pulse until fine crumbs form (you should have about 2 c.). Transfer to a medium bowl. Add butter, brown sugar, and salt and stir until mixture resembles wet sand. Press evenly into bottom of prepared pan.
            Step 3
            Bake crust until lightly golden, about 15 minutes. Let cool.
            Cheesecake
            Step 1
            Reduce oven temperature to 325°. Bring a medium pot or kettle of water to a boil.
            Step 2
            In a large bowl, using a handheld mixer on medium-high speed, beat cream cheese and brown sugar until smooth. Add sour cream and beat until no lumps remain. Add eggs, one at a time, beating to blend after each addition. Add flour, vanilla, cinnamon, and salt and beat to combine.
            Step 3
            Pour batter into crust; smooth top. Place pan in a large roasting pan and pour in enough boiling water to come halfway up sides of baking pan.
            Step 4
            Bake cheesecake until the center is still slightly jiggly, 30 minutes. Let cool.
            Step 5
            Cover pan and refrigerate bar until cold, at least 4 hours and up to 1 day.
            Pecan Topping
            Step 1
            In a medium nonstick skillet over low heat, cook brown sugar and butter, stirring, until bubbly, about 3 minutes. Stir in pecans, cream, cinnamon, and salt until coated. Let cool.
            Step 2
            Spoon topping over bar. Using parchment overhang, lift out bar and transfer to a cutting board. Cut into squares.
            Step 3
            Make Ahead: Topping can be made 1 hour ahead. Transfer to an airtight container and store at room temperature (don’t refrigerate as butter will solidify).
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a61936679/pecan-pie-cheesecake-bars-recipe/
        `
    },
    {
        name: 'French Silk Brownies',
        url: 'https://hips.hearstapps.com/hmg-prod/images/french-silk-brownies-lead-67005cf96fe40.jpg?crop=1xw:1xh;center,top&resize=1200:*',
        description: `
        Ingredients
            Brownie Bars
            Cooking spray
            1/2 c. (1 stick) unsalted butter
            3 oz. bittersweet chocolate
            1 c. (200 g.) sugar
            2 large eggs
            1/2 c. (60 g.) all-purpose flour
            1/2 tsp. pure vanilla extract
            1/4 tsp. kosher salt
            Filling
            1 (2 1/4-tsp.) packet gelatin
            1 1/2 c. heavy cream, divided
            1 c. dark or semisweet chocolate chips
            1/2 c. (60 g.) confectioners' sugar
            1 tsp. pure vanilla extract
            1/4 tsp. kosher salt
            Topping
            1 c. heavy cream
            1/4 c. (30 g.) confectioners' sugar
            1 tsp. pure vanilla extract
            Chocolate shavings or curls, for garnish


        Directions
            Brownie Bars
            Step 1
            Arrange a rack in center of oven; preheat to 350°. Grease an 8" x 8" pan with cooking spray. Line with parchment, leaving an overhang on 2 opposite sides.
            Step 2
            In a small saucepan over low heat, heat butter and chocolate, stirring occasionally, until almost melted, about 3 minutes. Remove from heat and stir until smooth. Let cool.
            Step 3
            Add sugar and stir to combine. Add eggs, one at a time, whisking to blend after each addition. Add flour, vanilla, and salt and mix until no streaks of flour remain. Pour batter into prepared pan.
            Step 4
            Bake brownies until slightly firm in the center, about 20 minutes. Let cool.
            Filling
            Step 1
            In a small bowl, combine gelatin and 1/4 c. cream.
            Step 2
            Place chips in a medium heatproof bowl. In a small heatproof bowl or container, microwave 3/4 c. cream in 15-second increments until hot and close to boiling, about 45 seconds total.
            Step 3
            Pour hot cream over chips. Add gelatin mixture, let sit 1 to 2 minutes, then stir until smooth. Let cool to room temperature, about 20 minutes.
            Step 4
            Meanwhile, in the large bowl of a stand mixer fitted with the whisk attachment, beat confectioners’ sugar, vanilla, salt, and remaining 1/2 c. cream on medium-high speed until stiff peaks form, 2 to 3 minutes. Transfer whipped cream to another bowl.
            Step 5
            Add cooled chocolate mixture to bowl of stand mixer and beat with the whisk attachment until light and fluffy. Fold whipped cream into chocolate mixture until no white streaks remain.
            Step 6
            Using an offset spatula, spread chocolate layer over brownie layer. Refrigerate bar until chocolate layer is set, at least 30 minutes and up to 3 days.
            Topping
            Step 1
            In the large bowl of stand mixer fitted with the whisk attachment, beat cream, confectioners’ sugar, and vanilla on medium-high speed until stiff peaks form, 2 to 3 minutes.
            Step 2
            Spread whipped topping over chocolate layer. Refrigerate brownies until set, 1 to 2 hours and up to 3 days.
            Step 3
            Using parchment overhang, lift out brownies and transfer to a cutting board. Top with chocolate shavings. Cut into squares.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a62611087/french-silk-brownies-recipe/
        `
    },
    {
        name: 'Apple Crisp',
        url: 'https://hips.hearstapps.com/hmg-prod/images/apple-crisp-lead-6435c97008904.jpg?crop=1xw:1xh;center,top&resize=1200:*',
        description: `
        Ingredients
            5 Honeycrisp, Granny Smith, and/or Cripp’s Pink apples, peeled, cored, sliced 1/4" to 1/2" thick
            2 Tbsp. cornstarch
            2 Tbsp. fresh lemon juice 
            2 Tbsp. granulated sugar 
            1/4 tsp. ground nutmeg
            2 tsp. ground cinnamon, divided
            1 1/2 c. (135 g.) rolled oats 
            3/4 c. (160 g.) packed light brown sugar 
            2/3 c. (80 g.) all-purpose flour 
            1/4 tsp. kosher salt
            3/4 c. (1 1/2 sticks) unsalted butter, melted
            Vanilla ice cream, for serving (optional)


        Directions
            Step 1
            Preheat oven to 350°. In a medium bowl, toss apples, cornstarch, lemon juice, granulated sugar, nutmeg, and 1 teaspoon cinnamon.
            Step 2
            In a small bowl, toss oats, brown sugar, flour, salt, and remaining 1 teaspoon cinnamon. Add butter and stir until a crumbly mixture forms resembling wet sand.
            Step 3
            Arrange apple mixture in a 2-quart ceramic baking dish. Top with oat mixture.
            Step 4
            Bake until apples are soft, topping is crisp and golden brown, and juices are bubbling around edges of dish, 55 to 70 minutes. Serve warm with ice cream (if using).
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a43051815/apple-crisp-recipe/
        `
    },
    {
        name: 'Pumpkin Cheesecake',
        url: 'https://hips.hearstapps.com/hmg-prod/images/del089923-pumpkincheesecake-web-048-ls-lead-64d511a87320b.jpg?crop=1xw:1xh;center,top&resize=1200:*',
        description: `
        Ingredients
            Crust
            Nonstick cooking spray
            8 oz. crisp ginger cookies
            2 Tbsp. light brown sugar
            1/4 tsp. kosher salt
            5 Tbsp. unsalted butter, melted, cooled
            Filling
            1 1/4 c. (270 g.) packed light brown sugar
            1 tsp. ground cinnamon
            1 tsp. ground ginger
            1/2 tsp. ground nutmeg
            1/2 tsp. kosher salt 
            1/4 tsp. ground cloves
            3 (8-oz.) blocks cream cheese, room temperature
            4 large eggs, room temperature
            1 (15-oz.) can pure pumpkin purée (preferably Libby’s)
            2 tsp. pure vanilla extract
            Whipped cream, for serving


        Directions
            Crust
            Step 1
            Place a rack in center of oven; preheat to 350°. Grease a 9" springform pan with cooking spray.
            Step 2
            In a food processor, pulse cookies, brown sugar, and salt until fine crumbs form. Add butter and continue to pulse until mixture resembles wet sand.
            Step 3
            Pour crumbs mixture into prepared pan. Using the back of a spoon or a measuring cup, press into bottom and up sides of pan.
            Step 4
            Bake crust until fragrant and a shade darker in color, 10 to 12 minutes. Let cool.
            Filling
            Step 1
            Reduce oven temperature to 325°. In the large bowl of a stand mixer fitted with the paddle attachment, beat brown sugar, cinnamon, ginger, nutmeg, salt, and cloves on low speed until combined. Add cream cheese and beat on medium speed until soft and creamy, 2 to 3 minutes.
            Step 2
            Add eggs, one at a time, beating on low speed and scraping down bowl after each addition. Add pumpkin purée and vanilla and beat on low speed until combined.
            Step 3
            Fill a large pot with water and bring to a simmer over high heat. Place a large sheet of foil on a work surface. Place cooled springform pan in the center and fold foil up and around outside of pan, folding and snuggly crimping. Repeat with another sheet of foil, with the goal of ensuring the pan is water-tight.
            Step 4
            Pour pumpkin mixture into crust. Place springform pan inside a large roasting pan. Carefully ladle simmering water into roasting pan until it reaches about halfway up sides of springform pan.
            Step 5
            Carefully transfer roasting pan to oven. Bake cheesecake until set around the edges and just slightly wobbly in the center, 85 to 105 minutes.
            Step 6
            Let cheesecake cool in roasting pan 1 hour. Remove springform pan from roasting pan and let cheesecake cool to room temperature. Refrigerate at least 4 hours or up to overnight (overnight is better).
            Step 7
            Top with whipped cream and serve.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a44053320/pumpkin-cheesecake-recipe/
        `
    },
    {
        name: 'Frozen Peppermint Pattie Pie',
        url: 'https://hips.hearstapps.com/hmg-prod/images/frozen-peppermint-pattie-pie-lead-670edaffcbfeb.jpg?crop=1xw:1xh;center,top&resize=1200:*',
        description: `
        Ingredients
            Crust
            20 Oreos
            4 Tbsp. unsalted butter, melted
            Filling
            1 (14-oz.) can sweetened condensed milk
            1 (8-oz.) pkg. cream cheese, softened
            1 tsp. peppermint extract
            1 c. heavy cream
            Ganache
            3/4 c. dark (about 63%) chocolate chips
            1/3 c. heavy cream

        Directions
            Crust
            Step 1
            In a food processor, pulse Oreos and butter until fine crumbs form.
            Step 2
            Pour mixture into a 9" pie plate. Press into an even layer on bottom and up sides of plate. Refrigerate until ready to use.
            Filling
            Step 1
            In a large bowl, using a handheld mixer on medium-high speed, beat milk, cream cheese, and peppermint extract until smooth. Add cream and beat until stiff peaks form, 2 to 3 minutes.
            Step 2
            Pour filling over crust and smooth in an even layer. Cover with plastic wrap and freeze until solid, at least 4 hours and up to overnight.
            Ganache
            Step 1
            Place chocolate chips in a medium heatproof bowl. In a small pot over medium heat, heat cream just until bubbles start to form. Pour hot cream over chocolate and let sit 1 minute, then whisk until smooth.
            Step 2
            Uncover pie. Pour ganache over and smooth in an even layer. Continue to freeze until chocolate is set, at least 15 minutes and up to 1 hour.
        Recipe link: https://www.delish.com/cooking/recipe-ideas/a62740022/frozen-peppermint-pattie-pie-recipe/
        `
    }
];


  intializeRecipes(appetizers, appetizerListEl);
  intializeRecipes(mainDishes, mainDishesListEl);
  intializeRecipes(desserts, dessertsListEl);
