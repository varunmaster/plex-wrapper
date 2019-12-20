const express = require('express');
const db = require('./models');

// set up app
const app = express();
const PORT = process.env.PORT || 3000;

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// set up routes
// const routes = require('./routes');

// app.use(routes);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`🗺️ => now listening on http://localhost:${PORT}`));
});
