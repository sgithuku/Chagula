import db from "./index"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

// const choices = [
//   { name: "chickpea curry ", category: "indian" },
//   { name: "kidney bean and sweet corn curry ", category: "indian" },
//   { name: "butter chicken", category: "indian" },
//   { name: "chicken spicy rice and peppers", category: "indian" },
//   { name: "brined chicken wings", category: "european" },
//   { name: "sausage stew and crispy kale ", category: "european" },
//   { name: "chorizo pasta", category: "european" },
//   { name: "creamiest mash potato", category: "european" },
//   { name: "crispy grilled chicken thighs ", category: "european" },
//   { name: "honey and mustard grilled chicken ", category: "european" },
//   { name: "garlic and chilli prawns with fried plantain", category: "indian" },
//   { name: "black chickpeas with puri", category: "indian" },
//   { name: "red split lentil dhal", category: "indian" },
//   { name: "potato curry", category: "indian" },
//   { name: "beef lasagne", category: "european" },
//   { name: "potato gratin", category: "european" },
//   { name: "seared chicken and mushroom ", category: "european" },
//   { name: "roast potatoes", category: "european" },
//   { name: "baked sweet potato ", category: "european" },
//   { name: "chickpea salad", category: "indian" },
//   { name: "leafy feta salad", category: "indian" },
//   { name: "silky morning eggs", category: "european" },
//   { name: "heuvos rancheros", category: "mexican" },
//   { name: "roast duck legs", category: "european" },
//   { name: "coconut chickpea curry ", category: "indian" },
//   { name: "slow roasted pork", category: "european" },
//   { name: "coconut prawn curry", category: "indian" },
//   { name: "veggie chilli", category: "mexican" },
//   { name: "guacamole", category: "mexican" },
//   { name: "coriander chutney ", category: "indian" },
//   { name: "tomato salsa", category: "indian" },
//   { name: "kachumbar", category: "indian" },
//   { name: "methi chicken curry", category: "indian" },
//   { name: "aloo paratha", category: "indian" },
//   { name: "indian potato balls (bateta vada)", category: "indian" },
//   { name: "crispy onion bhajiya", category: "indian" },
//   { name: "marus bhajiya", category: "indian" },
//   { name: "black-eyed bean stew", category: "indian" },
//   { name: "seared chicken stew with ugali", category: "indian" },
//   { name: "overnight urud dhaal", category: "indian" },
//   { name: "jeera rice", category: "indian" },
//   { name: "raita", category: "indian" },
//   { name: "veggie fried rice", category: "indian" },
//   { name: "chapati", category: "indian" },
//   { name: "sabu dhana", category: "indian" },
//   { name: "salmon tikka", category: "indian" },
//   { name: "pickled onions", category: "indian" },
//   { name: "baked cheesecake", category: "dessert" },
//   { name: "pineapple & mango crumble", category: "dessert" },
//   { name: "easy home-made bread", category: "baking" },
//   { name: "mushroom risotto ", category: "indian" },
//   { name: "classic carbonara", category: "indian" },
//   { name: "mango salsa", category: "indian" },
//   { name: "shakshuka", category: "indian" },
//   { name: "banging potatoes and puri", category: "indian" },
// ]

const days = [
  { name: "Sunday" },
  { name: "Monday" },
  { name: "Tuesday" },
  { name: "Wednesday" },
  { name: "Thursday" },
  { name: "Friday" },
  { name: "Saturday" },
]

const seed = async () => {
  for (let i = 0; i < days.length; i++) {
    await db.day.create({
      data: {
        name: `${days[i].name}`,
        // category: `${choices[i].category}`,
      },
    })
  }
}

export default seed
