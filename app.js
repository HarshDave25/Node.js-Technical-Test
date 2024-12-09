const express = require('express');
const mysql = require('mysql2');

// Initialize the app and MySQL connection
const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost', // your database host
    user: 'yourUsername', // your database username
    password: 'yourPassword', // your database password
    database: 'yourDatabaseName' // your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Define your API route
app.get('/api/getVendorUsers', async (req, res) => {
    const { prId, custOrgId } = req.query;

    if (!prId || !custOrgId) {
        return res.status(400).json({ error: 'Missing required query parameters prId or custOrgId' });
    }

    try {
        // Run the database query
        const [results] = await db.promise().query(
            `SELECT DISTINCT 
                 pli.suppliers AS supplierId, 
                 vu.UserName, 
                 vu.Name 
             FROM PrLineItems pli 
             JOIN VendorUsers vu 
             ON FIND_IN_SET(vu.VendorOrganizationId, pli.suppliers) 
             WHERE pli.purchaseRequestId = ? 
             AND pli.custOrgId = ? 
             AND vu.Role = 'Admin'`,
            [prId, custOrgId]
        );

        // Send the results as a response
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
