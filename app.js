const express = require('express');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

//routes
const course = require('./routes/Course');
const teacher = require('./routes/Teacher');


dotenv.config();
const port = process.env.PORT || 3000;
const logger = require('./middleware/logger');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan started");
}


app.get('/health', (req, res) => {
    res.send("<h2>Everything is working don't worry</h2>");
});

//register route
app.use("/v1/api/course", course);
app.use("/v1/api/teacher", teacher);


app.listen(port, () => {
    console.log(`App started at ${port}`);
});
