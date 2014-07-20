WELCOME TO FINANCE NODE
=======================


Original Author: Ido Green | plus.google.com/+Greenido
------------------------------------------------------
Date: 15 Aug 2013
-----------------
Current Author(s): Umar "uknj" Khan | twiiter.com/theuknj | facebook.com/the.uknj | github.com/uknj
------------------------------------------------------------------------------------------------
Date: 18 Jul 2014
-----------------


Fetch data from the web and save it into a Google Sheet document. (Google Id, password, spreadsheetId, worksheetId.)
To obtain spreadsheetId:
	1. Open spreadsheet in a web-browser. Example link: https://docs.google.com/spreadsheets/d/YOUR-ID-HERE/edit#gid=0

To obtain worksheetId, see [this stackoverflow link](http://stackoverflow.com/a/24832635/1453731) See the third bullet point.

Copy pasted here for ease of access:

Use the worksheet id instead of the worksheet name. This is a more difficult process:
Start by opening your spreadsheet in google drive

Find the spreadsheet id in the url. Example:
`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit?usp=drive_web`

List the sources by going to this url:
`view-source:https://spreadsheets.google.com/feeds/worksheets/SPREADSHEET_ID_HERE/private/full`

Find the entry from the response (od6 in the below example):

`<entry>
    <id>https://spreadsheets.google.com/feeds/worksheets/SPREADSHEET_ID_HERE/private/full/od6</id>
    ...
    <title type='text'>Sheet1</title>
    ...
</entry>`

Requirements:
  1. NodeJS
  2. npm install request
  3. npm install cheerio
  4. npm install edit-google-spreadsheet


Further requirements:
    None as of yet!


Objectives:
	1. Convert from column to row storage. DONE :)
	2. Allow stock searches from CLI and not from code. DONE :)
	3. Save multiple stock searches in the same worksheet.
	4. Attempting to allow for multiple stock searches. --DELAYED.
