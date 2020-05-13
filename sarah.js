//load path module
const path = require("path");
//load filesystem module that allows you to read directories and files within the app
const fs = require('fs');
//load xml parsing module
const xml2js = require('xml2js');
//load xmldol module
var DOMParser = require('xmldom').DOMParser;

fs.readdirSync('site/collection').forEach(function (file) {

  //create filename string without filetype
  file_name = file.replace(".xml", "");
  var file_data = fs.readFileSync('site/collection/'+file, "utf-8");

  var doc = new DOMParser().parseFromString(file_data,'text/xml');
  var monogr = doc.getElementsByTagName('monogr');
  console.log(monogr);
}




/*