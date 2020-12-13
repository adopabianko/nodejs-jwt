const router = require('express').Router();
const middleware = require('../commons/middleware/token');

router.get('/', middleware.validateToken, async (req, res) => {
    res.status(200).send('Posts Service');
});

module.exports = router;