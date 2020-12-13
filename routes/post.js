const router = require('express').Router();
const {validateToken} = require('../commons/middleware/token');

router.get('/', validateToken, async (req, res) => {
    res.status(200).send('Posts Service');
});

module.exports = router;