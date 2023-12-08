const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const api = require('./api'); // Path to api.js
const web = require('./web'); // Path to web.js
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Use API routes
app.use('/api', api);

// Use Web routes
app.use('/', web);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
