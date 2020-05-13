//load express module
const express = require("express");
//load path module
const path = require("path");
//load filesystem module that allows you to read directories and files within the app
const fs = require('fs');
//load liquid module
var { Liquid } = require('liquidjs');
//load xml parsing module
const xml2js = require('xml2js');

//create engine object using liquid
var engine = new Liquid();
//use express for server
var app = express();
//let Heroku set the port or have it default to 3000
var port = process.env.PORT || 3000;
//declare app's engine as liquid
app.engine('liquid', engine.express());

//tell the app where to look for templates
app.set('views', path.resolve(__dirname, "views"));

//set the view engine as liquid
app.set('view engine', 'liquid');

//tell app where the static resources are, from now on when there are relative links within the html of the website, it will use site as the root folder. Within this file, we still use the directory above site as the root.
app.use(express.static('site'));

/*BASIC ANATOMY OF A PILOT ROUTE

app.get("URL_COMPONENT", (req, res) => {
  res.render("TEMPLATE.LIQUID", {content: "CONTENT_YOU_WANT"});
});

Essentially, pick something to go on the end of your base url for URL_COMPONENT

Then specify which template you want to load, we use base.liquid for all basic pages and page.liquid for TEI pages

Then tell liquid what content you want rendered inside the {content} area of the template you selected. We specify html content by using the fs module for most of our base pages ( ex. fs.readFileSync('site/home.html')).

Keep in mind that different liquid templates will have different places where {content} is loaded or other liquid variables that you can pass information to. For example, the page.liquid does not have a {content} variable; instead it has a {filename} variable that you pass a .xml file to in order to run CETEIcean.*/

//when a user looks at the base page, this is what loads
app.get("/", (req, res) => {
  fs.readFile('site/home.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data });
  });
});

//render contact page
app.get("/contact", (req, res) => {
  fs.readFile('site/contact.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data })
  });
});

//render about page
app.get("/about", (req, res) => {
  fs.readFile('site/about.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data });
  });
});

//render search page
app.get("/search", (req, res) => {
  fs.readFile('site/search.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data });
  });
});

//toc page
app.get("/collection", (req, res) => {
  fs.readFile('site/toc.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data});
  });
});

//toc page
app.get("/explore", (req, res) => {
  fs.readFile('site/explore.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data});
  });
});

app.get("/test", (req, res) => {
  fs.readFile('site/barplot.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data});
  });
});

//test page for subject heading
app.get("/explore/religion", (req, res) => {
  fs.readFile('site/subjects/religion.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data});
  });
});

/*iterate through collection folder and generate a new page for each TEI file
The ":" specifies a dummy variable "file" that represents each item that matches that pattern inside the collection folder.
Within the liquid brackets, 'req.params.file+".xml"'' refers back to the file dummy variable and appends a .xml extension to it to get the right filename to pass to CETEIcean*/
app.get('/collection/:file', (req, res) => {
  res.render("page.liquid", { filename: req.params.file + ".xml" });
});

//render 404 page
app.use((req, res) => {
  res.statusCode = 404;
  res.end("404 - page not found");
});

//tell server where to run on and startup log
app.listen(port, () => {
  console.log("Application started on port 3000");
});

//PARSE XML!!!!!!!
//make new parser object
var parser = new xml2js.Parser({ explicitArray: false });
//create new content variable
var content = new Object();
//read collection directory synchronously, for each file do the following:
fs.readdirSync('site/collection').forEach(function (file) {
  
  //read file
  var data = fs.readFileSync('site/collection/' + file, "utf-8");
  //create filename string without filetype
  file_name = file.replace(".xml", "");
  
  //parse the xml using the parser we set up
  parser.parseString(data, function (err, result) {
    //error message
    if (err) {
      throw err;
    }
    //save xenoData info to variable
    var xeno = result.TEI.teiHeader.xenoData.replace(/[\n]/g, " ").replace(/\s{2,}/g, " ");
    //convert xenoData info to an object
    json = JSON.parse(xeno);
    //add info to the content variable using filename as property
    content[file_name] = json;

  });
});
//write file out to json
fs.writeFile("site/assets/js/index.json", /*need to convert content from object to JSON*/JSON.stringify(content), (err) => {
  if (err) {
      console.error(err);
      return;
  };
  
});