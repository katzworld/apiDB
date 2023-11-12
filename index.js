//Requiring modules.
const exp = require('express');
const app = exp();
app.use(exp.json())
const validation = require('./MiddleWares/validationMiddleWare')
const sufferSchema = require('./Validations/suffer')
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

const Datastore = require("nedb"),
    db = new Datastore({ filename: "/database/database.db", autoload: true });


app.use(sessions({
    secret: "thisismysecret",
    saveUninitialized: true,
    resave: false
}));


//Routes
app.get('/api', (req, res) => {
    res.status(200).end()
    req.session.destroy()
    return req.sessionID
});


app.post('/api', validation(sufferSchema), (req, res) => {
    let inSuffer = {
        suffer: req.body.suffer,
        lifetime_plotas: req.body.lifetime_plotas,
        plota: req.body.plota,
        check: req.body.check,
        session: req.sessionID,
        timestamp: new Date().getTime()
    }
    ////////////////////////////////    
    // body
    //  {
    //     suffer: 'katzworld.eth',
    //     lifetime_plotas: '143',
    //     plota: '3244',
    //     check: '3'
    //   }
    // sessionID
    //      yPVoBxzcTWqMaxJAiigmc9dHaApLKwoF
    // timeStamp
    ///////////////////////////////////////

    db.insert(inSuffer, function (err, doc) {
        res.status(200).end()
    })

})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
