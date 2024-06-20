describe("FormAutomation", () => {
  let formData;
  let selectors = ["#i5", "#i8", "#i11", "#i14"];
  let currentIndex = 0;

  before(() => {
    // Load the fixture once before any tests run
    cy.fixture("store.json").then((data) => {
      formData = data;
    });
  });

  function submitForm(dataIndex) {
    if (dataIndex >= formData.length) {
      return; // Stop recursion if all data has been submitted
    }

    const userdata = formData[dataIndex];

    // Visit the form URL
    cy.visit("https://docs.google.com/forms/d/e/1FAIpQLSeO8XBxpKS6gNOw9byfjcwC8A18xB9USgnPkqHqkDWvVgZKcA/viewform");

    // Click the current selector using a more precise selector to avoid multiple matches
    cy.get(selectors[currentIndex])
      .should('have.length', 1) // Ensure there's only one matching element
      .click()
      .should("have.attr", "aria-checked", "true");

    // Fill in the form
    cy.get("input.whsOnd").eq(0).type(userdata.name);
    cy.get("input.whsOnd").eq(1).type(userdata.email);
    cy.get("span.NPEfkd").eq(1).click();

    // Wait for the form to submit and redirect
    cy.wait(1000);
    cy.get("span.NPEfkd").eq(1).click();
    cy.url().should("include", "formResponse");

    // Go back to the form for the next submission
    cy.get('a[href*="viewform"]').click().then(() => {
      // Change the selector for the next submission
      currentIndex = (currentIndex + 1) % selectors.length;

      // Delete the submitted data every 5 submissions
      if ((dataIndex + 1) % 5 === 0) {
        formData.splice(0, 5);
        cy.writeFile("cypress/fixtures/store.json", formData).then(() => {
          // Call the function recursively for the next index after updating JSON
          submitForm(dataIndex + 1 - 5); // Adjust index after deletion
        });
      } else {
        // Call the function recursively for the next index
        submitForm(dataIndex + 1);
      }
    });
  }

  it("formautomation", () => {
    submitForm(0);
  });
});
