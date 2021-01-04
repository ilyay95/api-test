const express = require('express');
const router = require('./routes/index');
;

const app = express();

app.use('/api', router);

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`Express server listening on port ${process.env.PORT}...`);
// });

module.exports = app;
