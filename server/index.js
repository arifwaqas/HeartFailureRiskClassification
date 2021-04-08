require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); //req.body < data

app.post('/compute', (req, res) => { //route
    const { age, cre, dia, eje, bp, plt, ser, seso ,secre, sex, smok, time} = req.body;
    console.log(age, cre, dia, eje, bp,  plt, ser, seso, sex, smok, time, secre);
    //There you have to do the runtime environment thing
    res.send("Server has responded");
});

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));