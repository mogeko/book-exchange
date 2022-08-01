// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch"; // Setup fetch for testing
import { server } from "./lib/mocks/server";
import { faker } from "@faker-js/faker";

// Setup the Mock Server before each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Set Seeds for Faker JS
faker.seed(26136);
