const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== '__index.js' && file !== '__common.js')
  .forEach(file => {
    const route = require(path.join(__dirname, file));
    console.log(`Mounting: ${file}`);
    router.use('/', route); // ✅ No middleware here
  });

module.exports = router;
