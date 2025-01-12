describe("Home Page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should display the welcome message", () => {
        cy.get("h1")
            .should("contain.text", "Welcome to Todo")
            .and("be.visible");
    });

    it("should display the description text", () => {
        cy.get("p")
            .should(
                "contain.text",
                "The ultimate task management tool you've never seen before.."
            )
            .and("be.visible");
    });

    it('should have a "Get started" button that links to /auth/login', () => {
        cy.get('[data-testid="get-started-button"]')
            .should("contain.text", "Get started")
            .and("be.visible")
            .and("have.attr", "href", "/auth/login");
    });

    it('should navigate to the login page when "Get started" button is clicked', () => {
        cy.get('[data-testid="get-started-button"]').click();
        cy.url().should("include", "/auth/login");
        cy.get("h1").should("contain.text", "Login");
    });

    it("should render Header and Footer components", () => {
        cy.get('[data-testid="site-header"]').should("be.visible");
        cy.get('[data-testid="site-footer"]').should("be.visible");
    });

    it("should apply correct styles to the Home page section", () => {
        cy.get("section")
            .should("have.class", "py-12")
            .and("have.class", "md:py-24")
            .and("have.class", "lg:py-32");
    });

    context("Responsive Design", () => {
        it("should display correctly on mobile devices", () => {
            cy.viewport("iphone-6");
            cy.get("h1").should("have.class", "text-3xl");
            // Add more mobile-specific assertions as needed
        });

        it("should display correctly on desktop devices", () => {
            cy.viewport("macbook-15");
            cy.get("h1").should("have.class", "lg:text-6xl");
            // Add more desktop-specific assertions as needed
        });
    });
});
