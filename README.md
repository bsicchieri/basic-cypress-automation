# Automated testing with Cypress

## What was accomplished in this project:

- Set up a Cypress project from scratch
- Visit local and remote pages
- Deal with the most common elements found in web applications
- Test file _upload_
- Carry out the most diverse checks of expected results
- Create custom commands
- Deal with links that open in another browser tab
- Run tests simulating the dimensions of a mobile device
- Run tests in a continuous integration _pipeline_ whenever changes occur in the application or test code

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

## Installation

Run `npm install` (or `npm i`) to install the dev dependencies.

## Tests

You can run the tests simulating a desktop or mobile viewport.

### Desktop

Run `npm test` (or `npm t`) to run the test in headless mode on a desktop viewport.
Run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

### Mobile

Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.
Run `npm run cy:open:mobile` to open Cypress in interactive mode on a mobile viewport.