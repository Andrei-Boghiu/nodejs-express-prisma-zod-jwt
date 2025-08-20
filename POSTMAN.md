# Postman Tests Documentation

This document outlines the recommended structure and best practices for writing, organizing, and maintaining tests in Postman collections.

---

## 1. Writing Tests in Postman

- Use `pm.test` to define a test block.
- Use `pm.expect` for assertions.
- Always validate both the **status code** and the **response body**.

### Collection-Level (Global) Tests

Collection-level tests are executed for every request to enforce consistency. They typically include:

- **Response status checks**: Ensure no 5xx errors occur unexpectedly.
- **Expected success codes**: Map HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD) to their expected success status codes.
- **Success body validation**: Verify that responses (except 204 or HEAD) are either objects or arrays.
- **Error response validation**: Ensure 4xx status codes are returned when expected and that the response body contains an `error` field.
- **Fallback handling**: For unmapped HTTP methods, log a warning and check that the response does not indicate an error.

```JavaScript
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
    HEAD: 200
};

const expectedStatusCode = statusMap[method];

// GLOBAL - EVERY
pm.test("Response status code isn't 5xx", () => { // e.g., endpoints should never return 5xx
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
    })
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
    pm.test("Response status code is 4xx", () => { // e.g., expect error to be handled properly
        pm.expect(responseCode).to.be.within(400, 499);
    });

    pm.test("Response body has error message", () => {
        pm.response.to.have.jsonSchema({
            type: "object",
            properties: {
                error: { type: "string" }
            },
            required: ["error"]
        });
    });
}
```

### Request-Level Tests

Request-level tests allow finer-grained validation:

- **DTO or schema validation**: Confirm the response matches the expected data structure.
- **Array checks**: Ensure arrays are not empty when applicable.
- **Specific value checks**: Validate critical fields have the correct types or values.

```JavaScript
const expectedSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "number" },
            category: { type: "string" },
            name: { type: "string" },
            inStock: { type: "boolean" }
        },
        required: ["id", "category", "name", "inStock"]
    }
};

pm.test("Response array is not empty", () => {
    const json = pm.response.json();
    pm.expect(json.length).to.be.above(0);
});

pm.test("Response matches schema", () => {
    pm.response.to.have.jsonSchema(expectedSchema);
});
```

### Success Examples

- Valid payload containing all required fields (excluding optional fields).
- Complete payload including optional and required fields.

### Error Handling Examples

- Unauthenticated requests.
- Unauthorized access attempts.
- Bad payloads or missing required fields.
- Requests missing headers or containing only optional values.

---

## 3. Structuring Tests in the Collection

- **Top-level folder**: Represents a resource type (e.g., Users, Projects, Auth).
- **Sub-folders**: Represent endpoints (e.g. Users/Find, Projects/Create).
- **Request naming conventions**: Use `Success: ` and `Error: ` prefixes to clearly indicate expected outcomes.

```
Collection
├─ Users
│ ├─ GET /users
│ │ ├─ Success: fetch all users
│ │ └─ Error: unauthorized request
│ └─ POST /users
│ ├─ Success: create new user
│ └─ Error: missing required fields
├─ Projects
│ ├─ GET /projects
│ └─ POST /projects
└─ Auth
├─ POST /login
└─ POST /logout
```
