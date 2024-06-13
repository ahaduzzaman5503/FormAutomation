// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },

// });
module.exports = {
  // Set a very high redirection limit
  redirectionLimit: 1000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
