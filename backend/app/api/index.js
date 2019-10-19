const express = require('express');
let router = express.Router();

/**
 * Api method example
 */
router.post('/model/method', async (req, res) => {
    try {
        // req.body validation
        let param = req.body.param;

        let result = await Model.method(req.body);
        res.json({
            success: true,
            data: result
        });
    } catch(e) {
        res.json({
            success: false,
            arguments: req.body
        });
        console.error(`[api.model.method]`, e);
    }
});

module.exports = router;