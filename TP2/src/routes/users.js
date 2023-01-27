const express = require('express')
const app = express().router()

router.get('/create', (req, res) => {
  res.send('Creation...')
})

module.exports = router;