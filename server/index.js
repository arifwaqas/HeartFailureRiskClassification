require('dotenv').config();

const R = require('r-integration');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); //req.body < data

app.post('/compute', (req, res) => { //route
    const { age, cre, dia, eje, bp, plt, ser, seso ,secre, sex, smok, time} = req.body;
    
    let result = R.callMethod("C:/Users/waqas/Desktop/model_created_rahul_rippen_modification.R", "predictor2", [age, cre, dia, eje, bp, plt, ser, seso ,secre, sex, smok, time]);
    console.log(result[1]);
    if (result[1] == 1){
        res.send("HIGH chance of fatality");
    }
    else res.send("LOW chance of fatality");
});

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));