const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
var app = express();

const port = process.env.PORT || 3000;  // check for heroku port enviroment variable

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    
    // logging middleware
    var log = `Page ${req.method} ${req.url} visited at ${new Date().toString()}`;
    console.log(log);                   // display to active server
    fs.appendFile('server.log', log+'\n', (err) => console.log('unable to append server.log'));  // save to a file for future reference
    next();                             // continues is important or routing stops
});

hbs.registerHelper('getCurrentYear', () => {
    
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    
    return text.toUpperCase();
});

app.get('/', (req, res) => {   // route http request

    res.render("home.hbs", { });
});
app.get('/help', (req, res) => {   // route http request

    res.render("help.hbs", { });
});
app.get('/about', (req, res) => {   // route http request

    res.render("about.hbs", { });
});
app.get('/projects', (req, res) => {   // route http request

    res.render("projects.hbs", { });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});  // listen to port