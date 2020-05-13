# Pilot: Publishing Interface for Literary Objects in TEI 

## Basic Overview
Pilot is a Node.js web app that utilizes CETEIcean javascript library to create a customizable digital publication tool that easily displays large amounts of TEI files in the browser with minimal code.

## In-Depth Description
Pilot is built within node.js and uses the express web application framework alongside the liquidjs module for Liquid template language. The basic purpose of Pilot is to use templating to allow users to generate many webpages featuring their TEI digital editions with as little code as possible. Pilot uses Liquid to create a single template page for displaying TEI files which you can then plug many TEI files into and automatically generate a new page for each one.

Pilot is incredibly customizable with simple templates ready for additional content and a heavily commented server file so users can edit and create routes to suit their needs. Pilot provides very basic structure and routing that can be easily imitated and built upon to create larger, more complicated applications with multiple collections and intricate interfaces.

## Features
* Ready-to-go basic structure and interfaces that are easily customizable
* Use of partial templates and inheritance so changes made to an interface in a template file will change on all pages of the website
* Automatic generation of HTML pages from TEI files handled by CETEIcean and express routes
* Annotation of digital editions via embedded Hypothes.is interface

## Getting Started
To begin, you need to have node and node package manager (npm) installed on your computer. Pilot has two dependencies: express and liquidjs. You can install them using npm install.

For a quick setup, simply place all your TEI files inside of site/collection/ and then run “node server.js” from the root folder. Your web application will be running on port 3000 and you should be able to access all your TEI files by filename on the http://localhost:3000/collection/ page.

## Structure of Pilot
```
├── LICENSE.md
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── server.js (server file, run this to run Pilot)
├── site/ (all static assets for the website including html, css, js)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── CETEIcean.css (CETEIcean base styling)
│   │   │   └── custom.css (customized css for CETEIcean output and site in general)
│   │   ├── images/
│   │   └── js/
│   │       ├── CETEI.js (CETEIcean script)
│   │       ├── behaviors.js (behaviors for CETEIcean script)
│   │       ├── elasticlunr.min.js (searching)
│   │       └── search.js (searching)
│   ├── collection/ (WHERE THE TEI FILES GO)
│   │  └── TEI FILES GO HERE.xml
│   ├── about.html
│   ├── contact.html
│   ├── home.html
│   └── search.html
└── views/ (all templates for the site)
    ├── base.liquid (boilerplate html code)
    ├── nav.liquid (navigation menu)
    ├── page.liquid (CETEIcean script embedded in a regular page for displaying digital edition)
    └── toc.liquid (table of contents page that gets its list from a specified directory)
```
## How it Works

The majority of Pilot’s functionality is located in three places: the CETEI.js file, the server.js file, and the views folder. CETEI.js is from CETEIcean by Hugh Cayless and Raffaele Viglianti. We used their javascript library to handle transforming TEI to HTML within the browser. The server.js file lays out how the web server works and all of the routing, which connects the templates from views/ folder to content and assets located in the site/ folder. The views/ folder contains all of the liquid templates that are combined and matched with content from site/ to create every page on the website.

In order to generate a typical page of content, the server.js file will use the render() method to render a page. When we use render(), it takes two arguments, a template and then any variable or information we want to pass to local content within that template. We use the filename of the liquid template for the template argument and then we use a string or variable within liquid brackets for the local content.

For example, here is the code that renders the base page:
```
  app.get("/", (req, res) => {
    res.render("base.liquid", {content: fs.readFileSync('site/home.html')});
    });
```
There is more information and examples of this commented within the server.js file.

To generate a page using a TEI file, Pilot uses the fs module in node.js to read all your TEI files in the collections directory, make a unique route for each one and then hand them off to the template page which then plugs the filename into the corresponding argument in the CETEIcean script in the template. Then whenever you access “baseurl.com/collections/yourfilename” your TEI file will appear there in the HTML form provided by CETEIcean. Again, see the server.js file for comments explaining how this works more in-depth.

## What is Customizable?

Pretty much everything.

For people who aren’t very experienced with web apps and simply want to use this as a template or a base, we would suggest editing the .liquid templates, CSS and HTML content to change the general look and feel of the site but for the most part leaving the directory structure and server.js alone. The custom.css file is how you can adjust the display of the converted TEI files by choosing whether or not to display certain elements.

## What TEI Renders out of the Box?

Without any styling, CETEIcean will render every TEI element in the original XML file. This leads to incredibly cluttered HTML that has every piece of encoded information that you included in the original document, which is hardly ideal. The way to change what gets displayed and how is by editing the custom.css file. In this file you can use the custom element names that CETEIcean created to affect how specific elements are rendered. For example, if you want to get rid of all the line breaks that you encoded, you simply read the HTML and find out what CETEIcean output the <lb> element as, in this case it is <tei-lb>. Then you go to the custom.css file and add a new block of code that styles the <tei-lb> element as follows:
```
  tei-lb{
    display: none;
  }
```
The above code will prevent the browser from rendering the lb element at all. If you want to simply adjust the styling instead of getting rid of elements, you can also use css. Take this example code for styling stage  directions:
```
  tei-stage{
    font-size: 1em;
    text-decoration: underline;
  }
```
The CSS specifies that the font is 1em large and that the text shoud be underlined. You can use CSS to make small or large changes to the display depending on how you want to represent certain elements. The w3schools.com has an [authoritative tutorial](https://www.w3schools.com/css/default.asp) on how to begin using CSS for those that are unfamiliar.
