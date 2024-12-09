app.get('/api/getVendorUsers', async (req, res) => {
    const { prId, custOrgId } = req.query;

    if (!prId || !custOrgId) {
        return res.status(400).json({ error: 'Missing required query parameters prId or custOrgId' });
    }

    try {
        const [results] = await db.query(
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

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.listen(port, () => {
    console.log(Server running on http://localhost:${port});
});