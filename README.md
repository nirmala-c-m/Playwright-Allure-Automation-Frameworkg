# Playwright-Allure-Automation-Framework

A boilerplate framework that helps you to write automation tests for E2E using Playwright.

### Test application
https://www.agoda.com/

## Key Features
* Playwright-based E2E Testing: Leverage Playwright to run your E2E tests in multiple browsers and devices.
* Allure Reporting: Integrated with Allure for detailed test reporting, including screenshots and steps.
* JavaScript with Page Object Model (POM): Organize your test code using the POM pattern to enhance code reusability and maintainability.
* Parallel Execution: Supports running tests in parallel for faster feedback.
* Customizable Test Configurations: Tailor your test runs with different options, including retries, headless mode, and trace collection
  
## Note
* Configuration File: The playwright.config.js file is designed for easy test management. The config allows for setting timeouts, parallel execution, and other parameters.
* Allure Reporting Setup: The framework is set up to automatically generate and open Allure reports after test execution.
* Avoid Using Arrow Functions in Hooks: Arrow functions have their own lexical context, which can cause issues with Playwright's hooks. Use regular function definitions to ensure the correct this context.

  
## Tech Stack
**Playwright** : E2E testing library.<br>
**Allure** : For generating rich, customizable reports.<br>
**TypeScript** : Optional, as this framework is built primarily with JavaScript.<br>
**Node.js** : Environment and runtime.<br>
**Prerequisites** :Node.js (>=14.x) , npm (>=6.x)<br>


## Plugins needed

- Playwright Test for VSCode

	```
	"@playwright/test": "^1.46.1",
    "@types/node": "^20.14.11",
    "allure-commandline": "^2.30.0",
    "allure-playwright": "^3.0.0-beta.10"
	```

 ## Package.json For Allure report Scripts

- Playwright Test for VSCode

	```
	 "scripts":
  {
    "test": "playwright test",
    "test:allure": "playwright test && allure generate allure-results --clean -o allure-report",
    "report:allure": "allure open allure-report",
    "testreportandopen:allure": "playwright test && allure generate allure-results --clean -o allure-report && allure open allure-report"
  }
	```
## Execution
We can execute the test in different ways:
* **Normal case:**
	* Execute `npm run test`
	* To execute specific tags from command line we can use npm argument parser npm_config_ -> `npx playwright test 03_FlightBooking.spec.js`
	* Can pass browser type from cli -> `npx playwright test 03_FlightBooking.spec.js --browsertype="firefox"`
	* Default value for browser is chrome
*  **Rerun failed cases:** run `npm run test test:failed`
* **To Add Fetch and Open Allure Report :** `playwright test && allure generate allure-results --clean -o allure-report && allure open allure-report`

#### Normal case
While executing `npm run test` package.json -> script -> test will be executed

**Argument passing through CLI (tags, browser type etc) -**
The simplest way to pass arguments to an npm script is to prepend the arguments to the argument parser called npm_config_ and attach the result to the process.env object. In `npm_config_tags` or `npm_config_browsertype`, arguments can be passed from CLI, eg: `npm run test --tags="@LoginScenarios"`<br>
**Note:** `TAGS` and `tags` are two different argument. TAGS is not working in linux env.

#### Rerun failed cases
While executing `npm run test test:failed` package.json -> script -> test:failed will be executed
* using `npm run test test:failed` we can execute failed test cases

## Test case creation
Test cases are defined in the Features folder in the form of `.feature` file.<br>
The first step in the feature file is used to provide the test data used in the test case.<br>
Once we get the appropriate test data we can continue rest of the test step.

### src/steps
* This folder contains all the step defined in the feature file like reading test data, Do the functionality like login, booking Flight etc<br>
### src/pages
* This folder contains all the operations defined in the steps file like login, create Hotel booking order etc
  
### src/utils/TestData -ead test data
* Test data reading start from test data path provided in step defined in the feature file.<br>
* Test data is provided in JSON file in `TestData/{feature name}/{TestData}`.<br>
* data reading is implimented in `JSON.parse(fs.readFileSync())`.<br>

## Test reporting
**src/allure-report, allure-results**<br>
Commonly used built-in reporters:
* List: Provides a detailed list of all test results.<br>
* Dot: Shows minimal output, useful for large test suites..<br>
* JSON: Outputs results in JSON format, suitable for further processing.<br>
* HTML: Generates an HTML report that can be viewed in a browser.<br>

**Impliment multiple-cucumber-html-reporter**<br>
* Use formater in `cucumber.js` to create json from cucumber report.
* Create `utils/reporter/reporter.ts` for creating report from the above json file.
* After the test execution, use `node reporter.ts` command to execute `reporter.ts` then it will convert json to cucumber-html-reporter.
* We dont want to execute command manually every time after a test execution, So we are putting the same command inside posttest.
`"posttest": "npx ts-node src/utils/reporter.ts"` in package.js

cucumber-html-reporter is more npm trendier than other reporters like allure reporter etc. thats why i choose this reporter.

## Why and why Not
* OOPS, used in framework 
* Design pattern used
	* Added factory design pattern in the framework - selecting the browser mechanism
	* DI injection in Test context
* No need to put the locators in exec or properties file because it's not efficient, if we implement such ecosystem we have to create and maintain separate files and related class to maintain that ecosystem which is an overkill

## Feature need to add
* dockerized the framework
	 https://codefresh.io/blog/not-ignore-dockerignore-2/
* Need to impliment DB validations
* Need to create artifactory for the framework


