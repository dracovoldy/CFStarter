/*eslint no-console: 0*/
"use strict";
// const Joi = require('joi');
const express = require("express");
const app = express();
app.use(express.json());
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');
const xsenv = require('@sap/xsenv');

passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

var http = require("http");

const places = [
    { id: 1, name: 'Delhi' },
    { id: 2, name: 'Pune' },
    { id: 3, name: 'Hyderabad' }
];

// function validatePlace(course) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     return Joi.validate(course, schema);
// }

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/places', (req, res) => {
    res.send(places);
});

// app.post('/api/places', (req, res) => {

//     const { error } = validatePlace(req.body);
//     if(error) { return res.status(400).send(error.details[0].message); }

//     const place = {
//         id: places.length + 1,
//         name: req.body.name
//     };
//     places.push(place);
//     res.send(place);
// });

//Input vaildation stored in one function so as to reuse it.

var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
}).listen(port);

// app.listen(port, function () {
//   console.log('mcapi listening on port ' + port);
// });
console.log("Server listening on port %d", port);
