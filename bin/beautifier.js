#!/usr/bin/node
var beautify=require("../lib/beautify"),nopt=require("nopt"),fs=require("fs"),parsed=nopt();function die(b){console.warn(b);console.warn("Usage: "+process.argv[1]+" file.{js,css,html} ...");process.exit(1)}
function beautifyFile(b){var d=b.split("."),c;fs.readFile(b,function(b,a){if(b)throw b;239===a[0]&&187===a[1]&&191===a[2]&&(a=a.slice(3));a=a.toString("utf8");switch(d[d.length-1]){case "js":c=c.js_beautify;break;case "css":c=c.css_beautify;break;case "html":c=c.html_beautify;break;default:die("invalid file format")}console.log(c(a))})}parsed.argv.remain.length||die("No files specified.");parsed.argv.remain.forEach(beautifyFile);
