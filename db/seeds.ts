import db from "./index"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const choices = [
  { name: "Chickpea curry ", category: "indian" },
  { name: "Kidney bean and sweet corn curry ", category: "indian" },
  { name: "Butter chicken", category: "indian" },
  { name: "Chicken spicy rice and peppers", category: "indian" },
  { name: "Brined chicken wings", category: "european" },
  { name: "Sausage stew and crispy kale ", category: "european" },
  { name: "Chorizo pasta", category: "european" },
  { name: "Creamiest Mash Potato", category: "european" },
  { name: "Crispy grilled chicken thighs ", category: "european" },
  { name: "Honey and mustard grilled chicken ", category: "european" },
  { name: "Garlic and chilli prawns with fried plantain", category: "indian" },
  { name: "Black chickpeas with puri", category: "indian" },
  { name: "Red split lentil dhal", category: "indian" },
  { name: "Potato curry", category: "indian" },
  { name: "Beef lasagne", category: "european" },
  { name: "Potato gratin", category: "european" },
  { name: "Seared chicken and mushroom ", category: "european" },
  { name: "Roast potatoes", category: "european" },
  { name: "Baked sweet potato ", category: "european" },
  { name: "Chickpea salad", category: "indian" },
  { name: "Leafy feta salad", category: "indian" },
  { name: "Silky morning eggs", category: "european" },
  { name: "Heuvos Rancheros", category: "mexican" },
  { name: "Roast Duck Legs", category: "european" },
  { name: "Coconut chickpea curry ", category: "indian" },
  { name: "Slow roasted pork", category: "european" },
  { name: "Coconut prawn curry", category: "indian" },
  { name: "Veggie Chilli", category: "mexican" },
  { name: "Guacamole", category: "mexican" },
  { name: "Coriander Chutney ", category: "indian" },
  { name: "Tomato Salsa", category: "indian" },
  { name: "Kachumbar", category: "indian" },
  { name: "Methi Chicken curry", category: "indian" },
  { name: "Aloo paratha", category: "indian" },
  { name: "Indian potato balls (Bateta Vada)", category: "indian" },
  { name: "Crispy onion bhajiya", category: "indian" },
  { name: "Marus bhajiya", category: "indian" },
  { name: "Black-eyed bean stew", category: "indian" },
  { name: "Seared chicken stew with Ugali", category: "indian" },
  { name: "Overnight Urud Dhaal", category: "indian" },
  { name: "Jeera rice", category: "indian" },
  { name: "Raita", category: "indian" },
  { name: "Veggie fried rice", category: "indian" },
  { name: "Chapati", category: "indian" },
  { name: "Sabu Dhana", category: "indian" },
  { name: "Salmon Tikka", category: "indian" },
  { name: "Pickled Onions", category: "indian" },
  { name: "Baked cheesecake", category: "dessert" },
  { name: "Pineapple & mango crumble", category: "dessert" },
  { name: "Easy home-made bread", category: "baking" },
  { name: "Mushroom risotto ", category: "indian" },
  { name: "Classic carbonara", category: "indian" },
  { name: "Mango salsa", category: "indian" },
  { name: "Shakshuka", category: "indian" },
  { name: "Banging potatoes and puri", category: "indian" },
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
