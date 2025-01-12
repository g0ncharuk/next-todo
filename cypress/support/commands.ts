Cypress.Commands.add("getByTestId", (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("registerUser", ({ name, email, password }) => {
    cy.visit("/auth/registration");
    cy.getByTestId("name-input").type(name);
    cy.getByTestId("email-input").type(email);
    cy.getByTestId("password-input").type(password);
    cy.getByTestId("submit-button").click();
    cy.getByTestId("form-success").should(
        "contain.text",
        "Account created successfully"
    );
    cy.getByTestId("back-button-link").should("be.visible").click();
    cy.url().should("include", "/auth/login");
});

Cypress.Commands.add("loginUser", ({ email, password }) => {
    cy.getByTestId("email-input").type(email);
    cy.getByTestId("password-input").type(password);
    cy.getByTestId("submit-button").click();
    cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("createTask", ({ title, content, priority }) => {
    cy.getByTestId("task-creation-form").should("be.visible");
    cy.getByTestId("task-title-input").type(title);
    cy.getByTestId("task-content-textarea").type(content);
    cy.getByTestId("task-priority-select").click();
    cy.getByTestId(`priority-${priority.toLowerCase()}`).click();
    cy.getByTestId("task-submit-button").click();
    cy.getByTestId(`task-title-${title}`).should("be.visible");
    cy.getByTestId(`task-content-${title}`).should("contain.text", content);
    cy.getByTestId(`task-status-${title}`).should("contain.text", "Todo");
    cy.getByTestId(`task-priority-${title}`).should("contain.text", priority);
});

Cypress.Commands.add("inProggresTask", ({ title, content, priority }) => {
    cy.getByTestId(`task-status-button-${title}`).click();
    cy.getByTestId(`task-status-${title}`).should(
        "contain.text",
        "In Progress"
    );
});

Cypress.Commands.add("doneTask", ({ title, content, priority }) => {
    cy.getByTestId(`task-status-button-${title}`).click();
    cy.getByTestId(`task-status-${title}`).should("contain.text", "Completed");
});

Cypress.Commands.add("deleteTask", ({ title, content, priority }) => {
    cy.getByTestId(`task-delete-button-${title}`).click();

    cy.getByTestId("dialog-confirm-title")
        .should("be.visible")
        .and("contain.text", "Delete Task");
    cy.getByTestId("dialog-confirm-description")
        .should("be.visible")
        .and(
            "contain.text",
            `Are you sure you want to delete the task "${title}"?`
        );

    cy.getByTestId("dialog-confirm-confirm").click();

    cy.wait(3000);

    cy.getByTestId(`task-item-${title}`).should("not.exist");
});
