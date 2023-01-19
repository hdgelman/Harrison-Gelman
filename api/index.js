const express = require('express');
const router = express.Router();
const { getUserById } = require('../db');
const jwt = require('jsonwebtoken');

router.use((error, req, res) => {
    res.send({
        name: error.name,
        message: error.message
    });
});

module.exports = router;