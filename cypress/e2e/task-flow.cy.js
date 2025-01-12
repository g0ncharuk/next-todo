// cypress/integration/task_flow_spec.js

describe("Task Flow", () => {
    const generateUniqueEmail = () => {
        const timestamp = Date.now();
        return `testuser+${timestamp}@example.com`;
    };

    let uniqueEmail;
    const userPassword = "password123";
    const userName = "Test User";

    beforeEach(() => {
        uniqueEmail = generateUniqueEmail();

        cy.session(uniqueEmail, () => {
            // Register the user
            cy.registerUser({
                name: userName,
                email: uniqueEmail,
                password: userPassword,
            });

            // Login the user
            cy.loginUser({
                email: uniqueEmail,
                password: userPassword,
            });
        });

        // Navigate to tasks page after session is restored
        cy.visit("/tasks");
    });

    context("Task Create", () => {
        const taskData = {
            title: "New Task Title",
            content: "This is a new task.",
            priority: "HIGH",
        };

        it("should create proccess", () => {
            cy.createTask(taskData);

            cy.inProggresTask(taskData);

            cy.doneTask(taskData);
        });


        it("should create delete", () => {
            cy.createTask(taskData);

            cy.inProggresTask(taskData);

            cy.deleteTask(taskData);
        });
    });
});
