

# Node.js Technical Test - API to Fetch Vendor Users

## Problem Statement

This project involves building a Node.js application using Express.js to create an API endpoint that fetches specific data from a relational database. The goal is to create a GET API endpoint `/api/getVendorUsers` which filters records from the `PrLineItems` table and fetches the corresponding users from the `VendorUsers` table based on unique supplier IDs.

## Features

- **GET API Endpoint**: `/api/getVendorUsers`
  - Accepts two query parameters: `prId` and `custOrgId`
- **Database Integration**:
  - Filters records in the `PrLineItems` table based on `prId` and `custOrgId`
  - Extracts unique supplier IDs from the `suppliers` column in the `PrLineItems` table
  - Fetches `UserName` and `Name` from the `VendorUsers` table where `VendorOrganizationId` matches the extracted supplier IDs and `Role` is "Admin"
  - Returns the result as a JSON array with the fields: `supplierId`, `UserName`, and `Name`

## Database Schema

### PrLineItems Table
- `suppliers`: A comma-separated list of supplier IDs
- `custOrgId`: Customer Organization ID
- `purchaseRequestId`: Purchase Request ID

### VendorUsers Table
- `VendorOrganizationId`: ID representing the Vendor Organization
- `UserName`: User name of the vendor
- `Name`: Full name of the vendor user
- `Role`: Role of the vendor user (filter by "Admin")

## Requirements

- **Node.js and Express.js** for API development
- **Database**: A relational database (MySQL) to fetch data from `PrLineItems` and `VendorUsers` tables
- **Single SQL Query**: Perform the necessary database operations in a single efficient SQL query
- **Error Handling**: Proper error handling for invalid parameters and database connectivity issues
- **Postman**: Test the API using Postman and include a screenshot of a successful response in the repository

## Instructions

### Prerequisites
- Node.js and npm installed
- Access to the MySQL database (use the details provided below)
  
### Setting Up the Application

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/nodejs-technical-test.git
    cd nodejs-technical-test
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up the database connection. Replace the database credentials in the `config.js` file with the provided details:

    - **DB Host**: `nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com`
    - **DB User**: `candidate`
    - **DB Password**: `NoTeDeSt^C10.6?SxwY882}`
    - **DB Port**: `3306`

4. Start the server:

    ```bash
    npm start
    ```

    The server will run on port `3000`.

### API Endpoint

- **Endpoint**: `GET /api/getVendorUsers`
- **Query Parameters**:
    - `prId`: Purchase Request ID
    - `custOrgId`: Customer Organization ID

- **Example**: 

    ```bash
    GET http://localhost:3000/api/getVendorUsers?prId=12345&custOrgId=6789
    ```

- **Response**:

    ```json
    [
      {
        "supplierId": "Supplier1",
        "UserName": "user1",
        "Name": "User One"
      },
      {
        "supplierId": "Supplier2",
        "UserName": "user2",
        "Name": "User Two"
      }
    ]
    ```

### Testing the API with Postman

1. Open [Postman](https://www.postman.com/).
2. Create a new GET request to the endpoint `/api/getVendorUsers` with the query parameters `prId` and `custOrgId`.
3. Take a screenshot of the successful response and include it in the repository.

### Error Handling

The application gracefully handles errors, including:

- Invalid query parameters (missing `prId` or `custOrgId`).
- Database connection issues.

## Submission

1. Create a GitHub repository for the project and push the code.
2. Include a **Postman screenshot** in the repository to show a successful API response.
3. Provide a URL to your GitHub repository for evaluation.

## Database Access

- **MySQL Database URL**: [MySQL Database](https://db-technical-test.conqt.com/)
- **DB Credentials**:
  - **DB User**: `candidate`
  - **DB Password**: `NoTeDeSt^C10.6?SxwY882}`
  - **DB Host**: `nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com`
  - **DB Port**: `3306`

---

## Evaluation Criteria

- **Correctness**: API should meet all requirements as described in the problem statement.
- **Code Quality**: Code should be clean, modular, and well-documented.
- **Efficiency**: The SQL query should be efficient and meet the requirements with a single query.
- **Error Handling**: The application should handle errors gracefully.
- **Documentation**: A README file with clear setup instructions and a Postman screenshot.
