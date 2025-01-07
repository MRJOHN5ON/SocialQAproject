# Social QA Project

This is an ongoing repo for The Social QA Bootcamp course by Steven Boutcher. [Social QA Bootcamp](https://stevenboutcher.thrivecart.com/social-qa-bootcamp/).
The course is focused on learning the Playwright framework.



## Tests
- **Adding to Cart**: There are two test files that handle the functionality of adding products to the shopping cart on the Amazon website:
  - `addCartDenyWarranty.spec.ts`: This test verifies the process of adding a product to the cart while denying the warranty. It checks for the visibility of the "No Thanks" button, asserts the success message, verifies the cart count, and ensures the item subtotal is correct.
  - `addCart2yearWarranty.spec.ts`: This test checks the process of adding a product to the cart while applying a 2-year warranty. It verifies that the warranty panel is triggered, checks the cart count, and ensures the item subtotal reflects the added warranty.
  
  Both tests utilize the `helper.ts` file, which contains config URLs for products with and without warranties. This allows for easy swapping of product links, enabling testing of different scenarios without changing the test code itself.
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
