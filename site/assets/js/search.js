// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

//create the lunr index with relevant fields
var index = elasticlunr(function () {
  this.addField('title');
  this.addField('poem');
  this.addField('date');
  this.addField('filename');
  this.setRef('id');
});

//create content variable for data store (all the text with formatting included)
content = [];
count = 0

//get json data and push it to store
$.getJSON("../assets/js/index.json", function (data,) {
  for (i in data) {
    
    //build store
    var store = new Object();
    store.title = data[i].title;
    store.poem = data[i].poem;
    store.date = data[i].date;
    store.filename = data[i].filename;
    store.id = count;
    content.push(store);
    count++
  }
});

//wait and then take store data and remove formatting for search index
setTimeout(function(){
for (i in content){
  var doc = new Object();
  doc.title = content[i].title.replace(/[.,!\n]/g, " ").toLowerCase().replace(/([a-zA-Z])'([a-zA-Z])/g, '$1$2').replace(/\s{2,}/g, " ");
  doc.poem = content[i].poem.replace(/[.,!\n]/g, " ").toLowerCase().replace(/([a-zA-Z])'([a-zA-Z])/g, '$1$2').replace(/\s{2,}/g, " ");
  doc.date = content[i].date;
  doc.filename = content[i].filename;
  doc.id = content[i].id;
  
  index.addDoc(doc);
}
}, 1000)

//perform the search
function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val().toLowerCase();

  //check query string against index and use lunr query boosting, expanding tokens, and boolean values
  var result = index.search(query, {
    fields: {
        title: {boost: 2},
        poem: {boost: 1}
    },
    bool: "OR",
    expand: true
  });

  //append results to page
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found ' + result.length + ' result</p>');
  } else {
    resultdiv.append('<p class="">Found ' + result.length + ' results</p>');
  }
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><h3><a href="/collection/'+  index.documentStore.docs[ref].filename+'">' + content[ref].title + '</a></h3><p>'+ content[ref].poem.substring(0,150)+'...</p><br/></div>';
    resultdiv.append(searchitem);

  }
}
//perform function
$(document).ready(function () {
  $('input#search').on('keyup', doSearch);

});