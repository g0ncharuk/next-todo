describe("Authentication Flow", () => {
    const generateUniqueEmail = () => {
        const timestamp = Date.now();
        return `testuser+${timestamp}@example.com`;
    };

    let uniqueEmail;
    const userPassword = "password123";
    const userName = "Test User";

    before(() => {
        uniqueEmail = generateUniqueEmail();
    });

    context("App Initialization", () => {
        it("should load the home page successfully", () => {
            cy.visit("/");
            cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
            cy.getByTestId("site-header").should("be.visible");
            cy.getByTestId("navbar").should("be.visible");
            cy.getByTestId("get-started-button").should("be.visible");
        });
    });

    context("User Registration", () => {
        beforeEach(() => {
            cy.visit("/auth/registration");
        });

        it("should display the registration form correctly", () => {
            cy.getByTestId("register-form").should("be.visible");
            cy.getByTestId("name-input").should("be.visible");
            cy.getByTestId("email-input").should("be.visible");
            cy.getByTestId("password-input").should("be.visible");
            cy.getByTestId("submit-button")
                .should("be.visible")
                .and("contain.text", "Create an account");
        });

        it("should display validation errors when submitting empty form", () => {
            cy.getByTestId("submit-button").click();

            cy.getByTestId("name-input-error").should(
                "contain.text",
                "Name is required"
            );
            cy.getByTestId("email-input-error").should(
                "contain.text",
                "Email is required"
            );
            cy.getByTestId("password-input-error").should(
                "contain.text",
                "Minimum of 6 charactrs required"
            );
        });

        it("should successfully register a new user with valid data", () => {
            cy.fixture("user").then((user) => {
                const email = uniqueEmail;

                cy.getByTestId("name-input").type(userName);
                cy.getByTestId("email-input").type(email);
                cy.getByTestId("password-input").type(userPassword);
                cy.getByTestId("submit-button").click();

                cy.getByTestId("form-success").should(
                    "contain.text",
                    "Account created successfully"
                );
            });
        });

        it("should display an error when registering with an existing email", () => {
            cy.fixture("user").then((user) => {
                cy.getByTestId("name-input").type(userName);
                cy.getByTestId("email-input").type(uniqueEmail);
                cy.getByTestId("password-input").type(userPassword);
                cy.getByTestId("submit-button").click();

                cy.wait(3000);

                cy.getByTestId("form-error").should(
                    "contain.text",
                    "User already exists"
                );
            });
        });

        it("should navigate to login page when back button is clicked", () => {
            cy.getByTestId("back-button-link").should("be.visible");
            cy.getByTestId("back-button-link").click();

            cy.url().should("include", "/auth/login");
        });
    });

    context("User Login", () => {
        beforeEach(() => {
            cy.visit("/auth/login");
        });

        it("should display the login form correctly", () => {
            cy.getByTestId("login-form").should("be.visible");
            cy.getByTestId("email-input").should("be.visible");
            cy.getByTestId("password-input").should("be.visible");
            cy.getByTestId("submit-button")
                .should("be.visible")
                .and("contain.text", "Login");
        });

        it("should display validation errors when submitting empty form", () => {
            cy.getByTestId("submit-button").click();

            cy.getByTestId("email-input-error").should(
                "contain.text",
                "Email is required"
            );
            cy.getByTestId("password-input-error").should(
                "contain.text",
                "Password is required"
            );
        });

        it("should display an error message on invalid login", () => {
            cy.getByTestId("email-input").type("invalid@example.com");
            cy.getByTestId("password-input").type("wrongpassword");
            cy.getByTestId("submit-button").click();

            cy.wait(3000);

            cy.getByTestId("form-error").should(
                "contain.text",
                "Invalid credentials"
            );
        });

        it("should successfully login with valid credentials", () => {
            cy.getByTestId("email-input").type(uniqueEmail);
            cy.getByTestId("password-input").type(userPassword);
            cy.getByTestId("submit-button").click();

            cy.url().should("include", "/dashboard");
        });
    });

    context("User Logout", () => {
        beforeEach(() => {
            cy.visit("/auth/login");
            cy.getByTestId("email-input").type(uniqueEmail);
            cy.getByTestId("password-input").type(userPassword);
            cy.getByTestId("submit-button").click();

            cy.url().should("include", "/dashboard");

            cy.visit("/dashboard");
        });

        it("should log out successfully", () => {
            cy.url().should("include", "/dashboard");
            cy.getByTestId("user-authenticated").should("be.visible");

            cy.getByTestId("logout-button").should("be.visible").click();

            cy.getByTestId("dialog-confirm-title")
                .should("be.visible")
                .and("contain.text", "Logout");
            cy.getByTestId("dialog-confirm-description")
                .should("be.visible")
                .and("contain.text", "Are you sure you want to logout?");

            cy.getByTestId("dialog-confirm-confirm").click();

            cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
            cy.get("h1")
                .should("contain.text", "Welcome to Todo")
                .and("be.visible");

            cy.get("p")
                .should(
                    "contain.text",
                    "The ultimate task management tool you've never seen before.."
                )
                .and("be.visible");
        });
    });
});
