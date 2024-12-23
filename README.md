# SocialQAproject

This is an ongoing repo for The Social QA Bootcamp course by Steven Boutcher. https://thesocialqa.com/
The course is focused on learning Playwright framework.



## Tests
- **Adding to Cart**: Tests the functionality of adding products to the shopping cart on the Amazon website.
- **Product Searches**: Verifies the search functionality for products on Amazon.
- **Podcast Sharing**: Ensures that the shareable link matches the text copied from the Copy Link button on the Amazon website.
- **Example Test**: A basic test to check the presence of specific headers on the Playwright website.

## Tech Stack
- Playwright
- TypeScript
- Node.js

## Framework Features
- **Configuration Options**: The following Playwright configuration options enhance the framework's capabilities:
    ```typescript
    use: {
        trace: 'retain-on-failure', // Retains traces for easier debugging of test failures
        testIdAttribute: "id", // Specifies the attribute used for test IDs, enhancing locator accuracy
        permissions: ["clipboard-read"] // Manages clipboard permissions for testing clipboard functionality
    }
    ```
- **Robust Locator Strategies**: Utilizes Playwright's `getByTestId()` and other locator methods for precise element targeting.
- **Cross-Browser Testing**: Supports testing across multiple browsers, including Chrome, with easy configuration.
- **Reusable Helper Functions**: Implements utility functions to promote code reuse and maintainability in tests.
- **Clipboard Interaction**: Tests clipboard functionality using Playwright's built-in permissions management.
- **Trace and Debugging Support**: Configured to retain traces on failure for easier debugging of test failures.

## Contribute
We welcome contributions! Please fork the repository and submit a pull request.

## Connect with me
Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/ryleyj).
