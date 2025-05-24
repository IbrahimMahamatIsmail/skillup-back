require("dotenv").config();
//require('./data/mongoDb');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 4001;
const Router = require('./routers/routes');
const allowedOrigins = [
  'http://localhost:3000',              // Dev front
  'https://skillup-front.vercel.app/'         // Prod mais pas encore déployé
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS non autorisé pour cette origine : ' + origin));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(Router);
app.use(express.static(path.join(__dirname, 'public')));

// Test
app.get('/', (req, res) => {
  res.send('API SkillUp operational !');
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Serveur lancée sur http://localhost:${PORT}`);
});
