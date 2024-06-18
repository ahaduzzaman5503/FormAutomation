describe("FormAutomation", () => {
  it("formautomation", () => {
    cy.fixture("example.json").then((data) => {
      data.forEach((userdata) => {
        cy.visit("https://docs.google.com/forms/d/e/1FAIpQLSeO8XBxpKS6gNOw9byfjcwC8A18xB9USgnPkqHqkDWvVgZKcA/viewform");
        cy.get("#i11").click().should("have.attr", "aria-checked", "true");
        cy.get("input.whsOnd").eq(0).type(userdata.name);
        cy.get("input.whsOnd").eq(1).type(userdata.email);
        cy.get("span.NPEfkd").eq(1).click();
        cy.wait(1000)
        cy.get("span.NPEfkd").eq(1).click();
        cy.url().should("include", "formResponse");
        cy.wait(1000)
        cy.get('a[href*="viewform"]').click();
      });
    });
  });
});
