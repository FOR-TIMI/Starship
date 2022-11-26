const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


db.once('open', ()=> {
    app.listen(PORT, () => {
        console.log(`Server Listening on port ${PORT} 🌎`)
    })
})
