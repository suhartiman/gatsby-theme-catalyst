describe("Smoke test", () => {
  it("Site loads", () => {
    cy.visit(`/`).assertRoute(`/`)
    cy.viewport(1440, 900)
    cy.get("header").should("be.visible")
    cy.get("main").should("be.visible")
    cy.get("footer").should("be.visible")
  })
})
describe("Navigation Menu Tests", () => {
  it("Navigation Works", () => {
    cy.visit(`/`)
    cy.viewport(1440, 900)
    cy.get("header").then(($header) => {
      if ($header.find("nav").length) {
        cy.get("nav").should("be.visible")
        cy.viewport(375, 812)
        cy.get("nav").should("not.be.visible")
        cy.get('button[aria-label*="Toggle Menu"]').should("be.visible").click()
        cy.get("nav").find("a").should("be.visible")
      } else {
        return "No Nav"
      }
    })
  })
})
