# UW–Madison Healthscreen App

https://healthscreen.wisc.edu/  

## Setting up your local dev environment

1. Clone the repo
2. If prompted, run `nvm install lts/erbium`
3. Run `npm install`
4. Run `npm start` -- will be running at http://localhost:4000 and will rebuild the app/reload the browser any time you edit one of the `.njk` template files.


**WARNING:** If the CSS and JS assets are not present in `public/` the Eleventy build will fail. (This should not happend because running `npm install` initially will generate them, but if it does, run `npm run watch` and, then in another terminal window, `npm start` )


## About the app

It uses Eleventy to manage the template files. 

The app includes a home page and multiple versions of the screening questions, one for each combination of language and role.

1. The home page prompts the user to pick their role and language. 
2. This choice is saved in the user's cookies and then the user is routed to the proper language/role version of the screening questions. (Upon subsequent visits, if the cookies were saved, the rerouting happens automatically.)
3. Clicking the *Start Over* button clears the cookies and routes back to the home page.

### Eleventy templates

The template files live in `src/site`. The screening question pages live in language folders named for the language code for each. Within each language folder, are additional folders for each role, plus a `partials` folder that includes the screening questions common to each role. (The health guidance screens vary between each role and are embedded within the `index.njk` view for each role.)

### UI language snippets

The UI of the app (e.g. Site title, "Next" button) can also be translated. The translations for these copy fragemtns live in `src/site/_data/site.js`.



