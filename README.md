# What is Chagula?

Chagula is a meal planner I built to help put some structure around how we decide what we eat every week. Lockdowns mean less going out and so we have tried to make sure there is variety in what we eat. We do this randomly most of the time and wanted something that hopefully isn't too bad to look at.

![screenshot](https://raw.githubusercontent.com/sgithuku/Chagula/master/public/screenshot.png)

**This is still very early in its development, so things are broken!**

### Why Chagula?

It's a Swahili abstraction of Chakula (food) and Chagua (to choose) - we couldn't think of anything better!

### Features

- Add your own recipes and cuisines
- Build your list of meals you want to eat
- Track whether you've eaten them or not
- Basic search/filtering
- Dark and light themes
- Auth and basic account management
- Use sqlite or postgres as your backend
- Pretty pictures for a selection of cuisines (stuff I generally eat)

### The immediate todo list

- Allow for links to be added for each meal
- Assign meals to days of the week
- Custom images for specific meals (form is currently broken)
- Limit sign-ups
- Test with postgres (currently working with sqlite and should in theory work with )

### Roadmap

The plan is to add the following features as a priority:

- Track what you ate this week
- Choose custom images for your meals
- Theming
- Drag and drop selection for the planner
- Calendar features in the distant future?

### What is not on the list

- Shopping lists / recipe imports (we use Grocy for that)

### Stack

This is a [Blitz.js](https://github.com/blitz-js/blitz) app so if something is not described well here, the best place to look is their [docs](https://blitzjs.com/docs).

### How to use

1. Clone the repo to somewhere convenient
2. Assuming this is a local install, install blitz

```bash
npm i -g blitz
```

3. Setup the database and the app itself

```bash
// Add your meals as a db seed. Look at the seeds.ts file for inspiration
blitz db seed

// Run migration (this will change with the latest version of blitz)
blitz db migrate

// start dev

blitz start

// setup new account
// ** profit **

```

### Alternatives

- Mealie - more for recording meals and their recipes
- Grocy - more for managing food inventory
