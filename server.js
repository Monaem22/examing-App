const express = require("express");
const app = express();
const dbConnection = require("./config/DB_connection");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const helmet = require("helmet");
const compression = require('compression')
const PORT = process.env.PORT || 2000;

dotenv.config();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())
app.use(helmet());

app.all('*', (req, res) => {
    res.status(404).send('Not Found routes');
})

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} on http://localhost:${PORT}`);
});