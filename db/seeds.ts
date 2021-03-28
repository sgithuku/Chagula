import db from "./index"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const choices = [
  { name: "chickpea curry ", category: "indian", recipe: "" },
  { name: "kidney bean and sweet corn curry ", category: "indian", recipe: "" },
  {
    name: "butter chicken",
    category: "indian",
    recipe: "https://charmicooks.netlify.app/posts/butter-chicken/",
  },
  { name: "chicken spicy rice and peppers", category: "mexican", recipe: "" },
  { name: "brined chicken wings", category: "european", recipe: "" },
  {
    name: "corn on the cob",
    category: "european",
    recipe: "https://charmicooks.netlify.app/posts/corn-on-the-cob/",
  },
  {
    name: "sausage stew and crispy kale ",
    category: "european",
    recipe: "https://charmicooks.netlify.app/posts/sausage-and-mash/",
  },
  { name: "chorizo pasta", category: "european", recipe: "" },
  { name: "creamiest mash potato", category: "european", recipe: "" },
  { name: "crispy grilled chicken thighs ", category: "european", recipe: "" },
  { name: "honey and mustard grilled chicken ", category: "european", recipe: "" },
  { name: "garlic and chilli prawns with fried plantain", category: "indian", recipe: "" },
  { name: "black chickpeas with puri", category: "indian", recipe: "" },
  {
    name: "Puri",
    category: "indian",
    recipe: "https://charmicooks.netlify.app/posts/perfect-puris/",
  },
  { name: "red split lentil dhal", category: "indian", recipe: "" },
  { name: "potato curry", category: "indian", recipe: "" },
  { name: "beef lasagne", category: "european", recipe: "" },
  { name: "potato gratin", category: "european", recipe: "" },
  {
    name: "seared chicken and mushroom ",
    category: "european",
    recipe: "https://charmicooks.netlify.app/posts/chicken-and-mushroom/",
  },
  { name: "roast potatoes", category: "european", recipe: "" },
  { name: "baked sweet potato ", category: "european", recipe: "" },
  { name: "chickpea salad", category: "indian", recipe: "" },
  { name: "leafy feta salad", category: "european", recipe: "" },
  { name: "silky morning eggs", category: "european", recipe: "" },
  { name: "heuvos rancheros", category: "mexican", recipe: "" },
  { name: "roast duck legs", category: "european", recipe: "" },
  { name: "coconut chickpea curry ", category: "indian", recipe: "" },
  { name: "slow roasted pork", category: "european", recipe: "" },
  { name: "coconut prawn curry", category: "indian", recipe: "" },
  { name: "veggie chilli", category: "mexican", recipe: "" },
  { name: "guacamole", category: "mexican", recipe: "" },
  { name: "coriander chutney ", category: "indian", recipe: "" },
  { name: "tomato salsa", category: "mexican", recipe: "" },
  { name: "kachumbar", category: "indian", recipe: "" },
  {
    name: "methi chicken curry",
    category: "indian",
    recipe: "https://charmicooks.netlify.app/posts/chicken-methi/",
  },
  { name: "aloo paratha", category: "indian", recipe: "" },
  { name: "indian potato balls (bateta vada)", category: "indian", recipe: "" },
  { name: "crispy onion bhajiya", category: "indian", recipe: "" },
  { name: "marus bhajiya", category: "indian", recipe: "" },
  { name: "black-eyed bean stew", category: "indian", recipe: "" },
  { name: "seared chicken stew with ugali", category: "indian", recipe: "" },
  { name: "overnight urud dhaal", category: "indian", recipe: "" },
  { name: "jeera rice", category: "indian", recipe: "" },
  { name: "raita", category: "indian", recipe: "" },
  { name: "veggie fried rice", category: "indian", recipe: "" },
  { name: "chapati", category: "indian", recipe: "" },
  { name: "sabu dhana", category: "indian", recipe: "" },
  { name: "salmon tikka", category: "indian", recipe: "" },
  { name: "pickled onions", category: "indian", recipe: "" },
  {
    name: "baked cheesecake",
    category: "dessert",
    recipe: "https://shaung.dev/posts/rum-vanilla-cheesecake-recipe",
  },
  { name: "pineapple & mango crumble", category: "dessert", recipe: "" },
  { name: "white bread (overnight)", category: "baking", recipe: "" },
  { name: "mushroom risotto ", category: "italian", recipe: "" },
  { name: "classic carbonara", category: "italian", recipe: "" },
  { name: "mango salsa", category: "indian", recipe: "" },
  { name: "shakshuka", category: "indian", recipe: "" },
  { name: "banging potatoes and puri", category: "indian", recipe: "" },
]

const days = [
  { name: "Sunday" },
  { name: "Monday" },
  { name: "Tuesday" },
  { name: "Wednesday" },
  { name: "Thursday" },
  { name: "Friday" },
  { name: "Saturday" },
]

const seedDays = async () => {
  for (let i = 0; i < days.length; i++) {
    await db.day.create({
      data: {
        name: `${days[i].name}`,
      },
    })
  }
}

const seedChoices = async () => {
  for (let i = 0; i < choices.length; i++) {
    await db.meal.create({
      data: {
        name: `${choices[i].name}`,
        category: `${choices[i].category}`,
      },
    })
  }
}

const seed = async () => {
  await seedDays()
  await seedChoices()
}

export default seed
