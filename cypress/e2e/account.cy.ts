import APP_ROUTES from "~/utils/appRoutes";

const FIRST_ACCOUNT_SELECTED = /^account 1 \(selected\)$/i;

describe("User accounts tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  beforeEach(() => {
    cy.login();

    cy.visitAndCheck(APP_ROUTES.accounts);

    cy.findAllByRole("link", { name: /add first account/i }).click();
    getNameTextbox().type("Account 1");
    clickOnSaveLink();
    cy.url().should("include", APP_ROUTES.accounts);
  });

  it("should allow to register new accounts and change the selected one", () => {
    headingShouldExist(FIRST_ACCOUNT_SELECTED);

    // Go to add account page
    clickOnAddAccountLink();
    cy.url().should("include", APP_ROUTES.addAccount);

    // Cancel it
    cy.findByRole("link", { name: /cancel/i }).click();
    cy.url().should("include", APP_ROUTES.accounts);

    // Add second account and select it
    clickOnAddAccountLink();
    getNameTextbox().type("Account 2");
    clickOnSaveLink();
    cy.url().should("include", APP_ROUTES.accounts);

    visitAccountsPage();
    headingShouldExist(/^account 1$/i);
    headingShouldExist(/^account 2 \(selected\)$/i);

    // Select the first account
    cy.findByRole("button", { name: /select account 1/i }).click();
    cy.url().should("include", APP_ROUTES.accounts);

    visitAccountsPage();
    headingShouldExist(FIRST_ACCOUNT_SELECTED);
    headingShouldExist(/^account 2$/i);
  });
});

function visitAccountsPage() {
  cy.visitAndCheck(APP_ROUTES.accounts);
}

function clickOnAddAccountLink() {
  cy.findAllByRole("link", { name: /add new account/i }).click();
}

function getNameTextbox() {
  return cy.findByRole("textbox", { name: /name/i });
}

function clickOnSaveLink() {
  cy.findByRole("button", { name: /save/i }).click();
}

function headingShouldExist(regex: RegExp) {
  cy.findByRole("heading", { name: regex }).should("exist");
}
