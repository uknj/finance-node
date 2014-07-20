/**
* Fetch data from the web and save it into a Google Sheet document
*
* Requirements:
  1. NodeJS
  2. npm install request
  3. npm install cheerio
  4. npm install edit-google-spreadsheet

* Author: Ido Green | plus.google.com/+Greenido
* Date: 15 Aug 2013
*/

var request     = require('request');
var cheerio     = require('cheerio');
var Spreadsheet = require('edit-google-spreadsheet');

// Some parameters 
// TODO: move from the global scope
var ticker  = "LVS";
var yUrl    = "http://finance.yahoo.com/q/ks?s=" + ticker;
var financeDetails = new Array();
var keyStr         = new Array();


// Upload our data to G-Sheet
function sheetReady(err, spreadsheet) {
    if (err) throw err;
    spreadsheet.add({ 1: { 1: "Attribute" } });
    spreadsheet.add({ 1: { 2: "Value" } });
   
    spreadsheet.add({ 
      2: {
        1: keyStr
      }
    });
    spreadsheet.add({ 
      2: {
        2: financeDetails
      }
    });

    spreadsheet.send(function(err) {
      if(err) throw err;
      console.log("Updated " + financeDetails.length + " Items with data");
    });
  }

//
// The main call to fetch the data, parse it and work on it.  
//
request(yUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);

    // the keys - We get them from a certain class attribute
    var td = $('.yfnc_tablehead1');
    $(td).each(function(j, val) {
      keyStr[j] = $(val).text();
    });

    // the values
    // TODO: normalize them 
    var tData = $('.yfnc_tabledata1');
    $(tData).each(function(j, val) {
      financeDetails[j] = $(val).text();
    });

    // Let's do something with the data we have
    for (var i=0; i < financeDetails.length; i++) {
      console.log (i + ") " + keyStr[i] + " " + financeDetails[i]);
    }

    // upload our data to Google sheet
    // yFinanceDataPerComapy
    Spreadsheet.create({
      debug: true,
      username: 'TODO-fill',
      password: 'TODO-fill',
      debug: true,
      spreadsheetName: 'TODO-yourSheetName',
      worksheetName: 'TODO-Sheet1orAbetterName',
      callback: sheetReady
    });
  }

}); // -- end of request --