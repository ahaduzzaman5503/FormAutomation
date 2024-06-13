describe("FormAutomation", () => {
  it("formautomation", () => {
    cy.fixture("example.json").then((data) => {
      data.forEach((userdata) => {
        cy.visit(
          "https://docs.google.com/forms/d/e/1FAIpQLScvqstDokohgT3643DeMx_Rlg71rIKLkS8sZ7jFN2sTWY-QbQ/viewform"
        );

        // Generate a random index to select one of the four radio buttons
        const radioButtons = ["#i8", "#i5", "#i11", "#i14"];
        const randomIndex = Math.floor(Math.random() * radioButtons.length);
        const selectedRadioButton = radioButtons[randomIndex];

        // Click the randomly selected radio button
        cy.get(selectedRadioButton)
          .click()
          .should("have.attr", "aria-checked", "true");

        // Fill in the form fields
        cy.get("input.whsOnd").eq(0).type(userdata.name);
        cy.get("input.whsOnd").eq(1).type(userdata.email);

        // Submit the form
        cy.get("span.NPEfkd").eq(1).click();
        cy.get("span.NPEfkd").eq(1).click();
        cy.wait(1000)
        
        // Wait for the confirmation page
        cy.url().should("include", "formResponse");
        
        cy.wait(1000)
        // Click the "Submit another response" link
        cy.get('a[href*="viewform"]').click();
      });
    });
  });
});
