var express = require("express");
var path = require("path");
var axios = require("axios");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

// Exercise 1 ([Help](http://expressjs.com/guide/routing.html))
/*
    1. Install Express in the project directory
    2. Create a get request endpoint => a message is returned when requested with the res.send() method
    3. Test the endpoint with REST Client (postman / insomnia)
*/

// Exercise 2 ([Help](http://expressjs.com/fr/4x/api.html#res.sendFile))
/*
    1. Create the HTML File called index.html 
    2. Create a put request endpoint => an html file with the res.sendFile method
    3. Make sure the path submited to res.sendFile is absolute by using path.join & __dirname
    4. Test the request with REST Client
*/

// Exercise 3 ([Help](http://expressjs.com/fr/4x/api.html#res.json))
/*
    1. Create a delete request endpoint => a json object {good: "yep"} - res.json
    2. Test the request with REST Client
*/

//  Exercise 4 ([Help](https://ejs.co/) && [Help](http://expressjs.com/guide/using-template-engines.html) && [Help](https://scotch.io/tutorials/use-ejs-to-template-your-node-application))
/*
    1. Create an EJS file called index.ejs
    2. Declare express view engine to be EJS using app.set("view engine", "ejs"); before the route declarations
    3. Create the Get request endpoint on /test-ejs, that will render the EJS File with res.render(path of file) (path is absolute)
    4. When using res.render, pass a parameter called myTitle
    5. Test the request with REST Client
*/

// Exercise 5 ([Help](https://ejs.co/))
/*
    1. Create a get request endpoint on /test-ejs2 => render my ejs file with res.render
    2. Pass an array of names, as a dynamic value to the EJS FILE (using res.render)
    3. Create a ForEach Statement that lists the array names in the EJS File
    4. Test the request with Rest CLIENT
*/

// Exercise 6 ([Help](https://github.com/expressjs/body-parser))
/*
 *
 * 1. Creating a form tag in my index.html file
 * 2. This form needs to have two inputs of type text
 * 3. This form needs an action  (request url ) of '/showPost'
 * 4. This form needs a method of 'POST'
 * 5. Create a GET request enpoint on /showHTML, when requested it should show index.html
 * 6. Create a POST  request endpoint on /showPost, when requested it should console.log(the post values)
 *          These data sent from client are accessed with req.body
 * 7. Test the request with Rest CLIENT
 */

// Exercise 7 ([Help](http://expressjs.com/en/api.html#req.query))
/*
 * 1. Create a new html file called formGet.html
 * 2. Define a form tag, actions needs to be "/showGet"
 * 3. Method needs to be GET
 * 4. Add 2 input fields DO NOT FORGET THE name property of each input
 * 5. Create a GET request endpoint on /showGET
 * 6. Console.log the body (data) of the request  req.query
 *      If you get an undefined, you need to check that you have bodyParser enabled with the correct method
 */

// Exercise 8 ([Help](http://expressjs.com/en/api.html#req.param)
/*
 * 1. Create a GET request endpoint on /number
 * 2. Add to that request endpoint a dynamic variable. /number becomes /number/:dynamicVariable, here dynamicVariable is called id => /number/:id
 * 3. use res.send to send back the value of this query parameter
 * 4. Test the query with the browser or REST CLIENT
 */

// Exercise 9 ([Help](https://github.com/axios/axios))
/*
 * 1. Install the Axios module (link above) - npm install --save axios / npm i -S axios
 * 2. Import the module before using it
 * 3. Create a GET request endpoint on /postlist
 * 4. When the GET is requested, use axios to fetch data from http://jsonplaceholder.typicode.com/posts/1
 * 5. res.json the data you get back from axios to your user
 */

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());




//Exercise 1
app.get("/", function (req, res) {
  res.send("a message");
});

// Exercise 2
app.put("/", function (req, res) {
  const absolutePath = path.join(__dirname, "index.html");
  res.sendFile(absolutePath);
});

// Exercise 3
app.delete("/", function (req, res) {
  res.json({ good: "yep" });
});

//Exercise 4
app.get("/test-ejs", function (req, res) {
  const absolutePath = path.join(__dirname, "index.ejs");
  res.render(absolutePath, { myTitle: "this is my title" });
});

//Exercise 5
app.get("/test-ejs2", function (req, res) {
  const absolutePath = path.join(__dirname, "index2.ejs");
  res.render(absolutePath, { users: ["Bob", "Larry", "Thomas"] });
});

//Exercise 6
app.get("/showHTML", function (req, res) {
  const absolutePath = path.join(__dirname, "index.html");
  res.sendFile(absolutePath);
});

//Exercise 7
app.post("/showPost", function (req, res) {
  console.log(req.body);
});

//Exercise 8
app.get("/number/:id", function (req, res) {
  const dynamicValue = req.params.id;
  res.send(dynamicValue);
});

//Exercise 9
app.get("/postlist", function (req, res) {
  axios
    .get("http://jsonplaceholder.typicode.com/posts/1")
    .then(function (axiosResponse) {
      // handle success
      res.json(axiosResponse.data);
    })
    .catch((e) => console.log(e));
});

//Exercise 10
app.get("/postlist", function (req, res) {
  axios
    .get("http://jsonplaceholder.typicode.com/posts/1")
    .then(function (axiosResponse) {
      // handle success
      const stringData = JSON.stringify(axiosResponse.data);
      fs.writeFile("posts.json", stringData, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      res.json(axiosResponse.data);
    })
    .catch((e) => console.log(e));
});

// Server listen
var server = app.listen(3000, function () {
  console.log("Server started on localhost:3000");
});