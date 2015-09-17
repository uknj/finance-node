var request     = require('request');
var cheerio     = require('cheerio');
var Spreadsheet = require('edit-google-spreadsheet');
 
// Some parameters 
// TODO: move from the global scope
var ticker = process.argv;


if(require.main == module) { //This block allows CLI arguments to process tickers! Example: Use Node finance-node_v2.js GOOG to obtain values for Google Inc.
    console.error('Invoked at command line.');
    var ticker = process.argv;
    if(ticker.length > 2) {
        ticker = ticker.slice(2, ticker.length);
    } else {
        ticker = undefined;
    };
}

var yUrl    = "http://finance.yahoo.com/q/ks?s=" + ticker; // This must be placed after the function that uses CLI arguments to process which ticker to process!
var financeDetails = new Array();
var keyStr         = new Array();
var rowValue       = 2;


// Upload our data to G-Sheet
function sheetReady(err, spreadsheet) {
    if (err) throw err;

    spreadsheet.add({ 1: { 1: "Ticker" } }); // Adds text "Ticker" to Cell A1.
    spreadsheet.add({ 2: { 1: ticker } }); // Adds Ticker name to Cell A2.

    spreadsheet.add({ 1: { 2:[ keyStr] }  }); // Adds finance attributes to Row 1.
    spreadsheet.add({ 2: { 2: [ financeDetails ] } }); // Adds values to Row 2.
    
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
      spreadsheetId: 'TODO-yourSheetName',
      worksheetId: 'TODO-Sheet1orAbetterName',
      callback: sheetReady
    });
  }

}); // -- end of request --