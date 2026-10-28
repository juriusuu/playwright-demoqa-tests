# Playwright DemoQA Tests

An end-to-end (E2E) UI and API test automation suite built with Playwright and TypeScript for testing components on DemoQA.

## Project Overview

This repository provides comprehensive automated test coverage for DemoQA web elements, interactive widgets, forms, and API endpoints. The framework follows software testing best practices by implementing the Page Object Model (POM) design pattern for modularity and maintainability.

### Key Highlights
* **Page Object Model (POM)**: Abstraction layers organized under `pages/` and `Widgets/BasePage.ts` for cleaner test scripts.
* **UI Testing**: End-to-end test suites covering Elements, Forms, Alerts, Widgets, and Interactions.
* **API & E2E Workflows**: Complete bookstore application coverage including registration, login, API verification (`apicheck.spec.ts`), workflows, edge cases, and negative test scenarios.
* **Continuous Integration**: Automated workflows set up via GitHub Actions (`.github/workflows`).

## Repository Structure

```text
playwright-demoqa-tests/
├── .github/workflows/ # CI/CD pipeline definitions
├── pages/ # Page Object Model classes
│   ├── alerts/ # Alert page models
│   ├── elements/ # Element page models
│   └── forms/ # Form page models
├── Widgets/ # Core page abstractions
│   └── BasePage.ts # Base page containing shared locator utilities
├── tests/ # Test specs organized by feature
│   ├── alerts/ # Alert handling specs
│   ├── bookstoreapplication/ # Bookstore Application test suites
│   │   ├── pages/ # API checks, edge cases, and negative tests
│   │   ├── apicheck.spec.ts
│   │   ├── bookstore-edge.spec.ts
│   │   └── bookstore-negative.spec.ts
│   ├── login.spec.ts # Authentication tests
│   ├── register.spec.ts # User registration tests
│   ├── scenario.spec.ts # End-to-end scenarios
│   ├── workflow.spec.ts # Business flow verification
│   ├── elements/ # UI element specs (buttons, checkboxes, tables, etc.)
│   ├── forms/ # Practice form automation specs
│   ├── interactions/ # Drag & drop, resizable, sortable specs
│   └── widgets/ # Accordian, datepicker, slider, tooltips specs
├── playwright.config.ts # Global Playwright configuration
├── package.json # Project dependencies and test scripts
└── tsconfig.json # TypeScript compiler options
```

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your system:
* Node.js (v16.x or higher)
* `npm` or `yarn`

### Installation
Clone the repository:

```bash
git clone [https://github.com/juriusuu/playwright-demoqa-tests.git](https://github.com/juriusuu/playwright-demoqa-tests.git)
cd playwright-demoqa-tests
```

Install project dependencies:

```bash
npm install
```

Install Playwright browser binaries:

```bash
npx playwright install
```

## Running Tests

### Execute All Tests
Run all test suites in headless mode:

```bash
npx playwright test
```

### Run Tests in Headed Mode
Watch tests run live inside a browser window:

```bash
npx playwright test --headed
```

### Run Specific Test Suite
Run tests for a single module (e.g., API checks or Form tests):

```bash
npx playwright test tests/bookstoreapplication/pages/apicheck.spec.ts
```
