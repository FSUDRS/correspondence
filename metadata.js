//load path module
const path = require("path");
//load filesystem module that allows you to read directories and files within the app
const fs = require('fs');
//load xml parsing module
const xml2js = require('xml2js');

//console.log("it works!");

//PARSE XML!!!!!!!
//make new parser object
var parser = new xml2js.Parser({ explicitArray: false });
var all_content = new Object();
//read collection directory synchronously, for each file do the following:
fs.readdirSync('metadata').forEach(function (file) {
  
  //read file
  var data = fs.readFileSync('metadata/' + file, "utf-8");
  //create filename string without filetype
  file_name = file.replace(".xml", "");
  //console.log(file_name);
  //parse the xml using the parser we set up
  parser.parseString(data, function (err, result) {
    //error message
    if (err) {
      throw err;
    }
    var file_content = new Object();
    
    //console.log(result.TEI.teiHeader.fileDesc.titleStmt.title);
    //title info
    var title = result.TEI.teiHeader.fileDesc.titleStmt.title;
    file_content.title = title;

    //publication info
    var publisher = result.TEI.teiHeader.fileDesc.publicationStmt.publisher;
    file_content.publisher = publisher;
    var liscence = result.TEI.teiHeader.fileDesc.publicationStmt.availability.licence._;
    file_content.liscence = liscence;


    var ms = result.TEI.teiHeader.fileDesc.sourceDesc.msDesc;
    var bibl = result.TEI.teiHeader.fileDesc.sourceDesc.biblStruct;
    console.log("ms: "+typeof ms);
    console.log("bibl: "+typeof bibl);
    //sourceDesc
    //console.log(result.TEI.teiHeader.fileDesc.sourceDesc);
    if(typeof ms != "undefined"){
  
      //manuscript
      var author = result.TEI.teiHeader.fileDesc.sourceDesc.msDesc.msContents.msItem.author;
      var date = result.TEI.teiHeader.fileDesc.sourceDesc.msDesc.msContents.msItem.docDate.$.when;
      
      file_content.author = author;
      file_content.date = date;

    }else if(typeof bibl != "undefined"){
      //print
      var author = result.TEI.teiHeader.fileDesc.sourceDesc.biblStruct.analytic.author;
      var date = result.TEI.teiHeader.fileDesc.sourceDesc.biblStruct.monogr.imprint.date.$.when;
      file_content.author = author;
      file_content.date = date;

      subjects = [];
      sub_path = result.TEI.teiHeader.profileDesc.textClass.keywords.term;
      for(i = 0; i < sub_path.length; i++){
        subjects[i] = sub_path[i];
      }
      file_content.subjects = subjects;
      
      
    }else{
      console.log("not a manuscript or print document");
    }
    
    all_content[file_name] = file_content;
    

    //add something to the content variable using filename as property
    

  });
});
//console.log("all content: " + all_content);
//write file out to json
fs.writeFile("site/assets/js/meta.json", /*need to convert content from object to JSON*/JSON.stringify(all_content), (err) => {
  if (err) {
      console.error(err);
      return;
  };
  
});