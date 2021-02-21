# What is Chagula?

Chagula is a meal planner I built to help put some structure around how we decide what we eat every week. Lockdowns mean less going out and so we have tried to make sure there is variety in what we eat. We do this randomly most of the time and wanted something that hopefully isn't too bad to look at.

![screenshot](https://raw.githubusercontent.com/sgithuku/Chagula/master/public/screenshot.png)

**This is still very early in its development, so things are broken!**

### Why the name Chagula?

It's a Swahili abstraction of Chakula (food) and Chagua (to choose) - couldn't think of anything better!

### Features

- Add your own recipes and cuisines (food categories for the less fancy)
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
- Docker container

### What is not on the list

- Shopping lists / recipe imports (we use Grocy for that)

### Stack

- This is a [Blitz.js](https://github.com/blitz-js/blitz) app so if something is not described well here, the best place to look is their [docs](https://blitzjs.com/docs).
- [Chakra-UI](chakra-ui.com/) for the UI (obviously)
- [Vercel](https://vercel.com), [Heroku](https://heroku.com) and [Render](https://render.com) are recommended by Blitz.

### How to use

1. Fork or Clone the repo to somewhere convenient
2. To develop locally, setup blitz:

```bash
npm i -g blitz
```

3. Setup your [database](https://blitzjs.com/docs/database-overview) which may require installing postgres if you don't have it running already. The repo is setup to use Heroku but switching to the simplest (sqlite) is pretty straightforward. Change the `db/schema.prisma` using the instructions here [switch to sqlite](https://blitzjs.com/docs/database-overview#switch-to-postgresql).

4. [Deploy](https://blitzjs.com/docs/deploy-heroku)

### Other, more popular options

- Mealie - more for recording meals and their recipes
- Grocy - more for managing food inventory
