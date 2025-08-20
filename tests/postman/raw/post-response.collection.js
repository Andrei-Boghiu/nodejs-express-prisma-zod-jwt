/**
 * * Purpose:
 *   This script is intended for use in the Postman "Scripts" tab and "Post-response" sub-tab
 *   at the collection level to apply global tests to all requests.
 */

const method = pm.request.method;
const responseCode = pm.response.code;
const expectSuccess = pm.info.requestName.startsWith("Success: ");
const expectError = pm.info.requestName.startsWith("Error: ");

const statusMap = {
  GET: 200,
  POST: 201,
  PUT: 200,
  PATCH: 200,
  DELETE: 204,
  OPTIONS: 204,
  HEAD: 200,
};

const expectedStatusCode = statusMap[method];

// GLOBAL - EVERY
pm.test("Response status code isn't 5xx", () => {
  // e.g., endpoints should never return 5xx
  pm.expect(responseCode).to.not.be.within(500, 599);
});

// GLOBAL - EXPECT SUCCESS
if (expectSuccess && expectedStatusCode) {
  pm.test(`Response status code is ${statusMap[method]}`, () => {
    pm.response.to.have.status(expectedStatusCode);
  });
} else if (expectSuccess) {
  console.warn(`No expected status defined for method ${method}`);
  pm.test("Response status isn't error", () => {
    pm.expect(responseCode).to.not.be.within(400, 599);
  });
}

if (expectSuccess && responseCode !== 204 && method !== "HEAD") {
  pm.test("Response body has object or array", () => {
    const data = pm.response.json();

    const isArray = Array.isArray(data);
    const isObject = data !== null && !Array.isArray(data) && typeof data === "object";

    pm.expect(isArray || isObject).to.be.true;
  });
}

// GLOBAL - EXPECT ERROR
if (expectError) {
  pm.test("Response status code is 4xx", () => {
    // e.g., expect error to be handled properly
    pm.expect(responseCode).to.be.within(400, 499);
  });

  pm.test("Response body has error message", () => {
    pm.response.to.have.jsonSchema({
      type: "object",
      properties: {
        error: { type: "string" },
      },
      required: ["error"],
    });
  });
}
