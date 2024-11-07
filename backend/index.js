const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const mainRouter = require('./Routes/Route');
app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log("Listening at port 3000 :)");
});
