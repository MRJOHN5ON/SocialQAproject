# Social QA Project

This is an ongoing repo for The Social QA Bootcamp course by Steven Boutcher. [Social QA Bootcamp](https://stevenboutcher.thrivecart.com/social-qa-bootcamp/).
The course is focused on learning the Playwright framework.



## Tests
- **Adding to Cart**: Tests the functionality of adding products to the shopping cart on the Amazon website. The `config.ts` file allows for easy swapping of the product link, enabling testing of any product. The adding to cart script is designed to handle different product situations, including whether the warranty panel is triggered. The expected cart count and item subtotal are dynamically adjusted based on whether a warranty is added or not.
- **Product Searches**: Verifies the search functionality for products on Amazon. The tests cover various scenarios, including:
  - Searching for a product by text and submitting using the enter button.
  - Searching for a product by text and submitting by clicking the search button.
  - Finding a product using its ASIN (Amazon Standard Identification Number) and verifying the correct product title is displayed.
- **Podcast Sharing**: Ensures that the shareable link matches the text copied from the Copy Link button on the Amazon website.
- **Example Test**: A basic test to check the presence of specific headers on the Playwright website.

## Tech Stack
- Playwright
- TypeScript
- Node.js

## Framework Features

- **Robust Locator Strategies**: Utilizes Playwright's `getByTestId()` and other locator methods for precise element targeting.
- **Cross-Browser Testing**: Supports testing across multiple browsers, including Chrome, with easy configuration.
- **Reusable Helper Functions**: Implements utility functions to promote code reuse and maintainability in tests.
- **Clipboard Interaction**: Tests clipboard functionality using Playwright's built-in permissions management.
- **Trace and Debugging Support**: Configured to retain traces on failure for easier debugging of test failures.

## Contribute
I welcome contributions! Please fork the repository and submit a pull request.

## Connect with me
Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/ryleyj).
