<h1 text-align="center">TransportedLabs-Framework-Template</h1>

## Introduction

TransportedLabs-Framework-Template - This project is based on Microsoft Playwright, which enables reliable end-to-end testing, Web testing.


## Features

- Easy to Configure
- Auto wait for all elements & checks
- Generate HTML report
- Generate detailed trace file which helps to debug
- Generate snapshot for each step
- Record video for test case execution
- Support Web automation with support for chrome, Edge, Firefox and Safari
- Dynamic data handling using external JSON files
- Support taking screenshots
- Support Serial and Parallel execution
- Environment configuration using .env files

## Tech Stack/Libraries Used

- [PlayWright](https://playwright.dev/) - for web automation
- [ESLint](https://eslint.org/) - pinpoint issues and guide you in rectifying potential problems in both JavaScript and TypeScript.
- [Prettier](https://prettier.io/) - for formatting code & maintain consistent style throughout codebase
- [Dotenv](https://www.dotenv.org/) - to load environment variables from .env file


## Getting Started

## Project Structure
**Project Structure**

- `helper`
    - `/web/webHelper.ts` contains functions for interacting with browser
- `tests` contains utility functions
    - `web` place to web tests
- `utils` contains utility functions
    - `config` contains config files
    - `report` contains report function files
    - `dataStore.js` acts as a in-memory data store. It is used to save data that needs to be shared between different test case
- `test-results` contains test results

### Prerequisite

- `nodejs`: Download and install Node JS from
  > `https://nodejs.org/en/download`
- `Visual Studio Code/Aqua/IntelliJ`: Download and install code editor

### Installation

- - clone the repo using below URL
    
    > 
    > 
- If you want to run this on your local machine, git clone the repo to local. In the main directory run the below commands. This will install playwright dependencies on your machine.:
    
    > npm install
    > 
- For first time installation use below command to download required browsers:
    
    > npx playwright install
    > 

### Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" "dev"`Test Cases are present in "tests" folder`:
    1. If you want to execute test in Staging then run this command
        - `npm run test:stg`
    2. If you want to execute test in Dev then run this command
        - `npm run test:dev`
    3. If you want to execute test in Prod then run this command
        - `npm run test:prod`


### Run Test

**Usage**

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" or "dev", `Test Cases are present in "tests" folder`:
- `npm run test:dev (name-of-file.spec.ts)`
- `npx playwright test (name-of-file.spec.ts) --headed --config=playwright.config.chrome.ts` to run test in ui mode on chrome browser
- `npx playwright test (name-of-file.spec.ts) --headed --config=playwright.config.firefox.ts` to run test in ui mode on firefox browser
- `npx playwright test (name-of-file.spec.ts) --headed --config=playwright.config.edge.ts` to run test in ui mode on edge browser

