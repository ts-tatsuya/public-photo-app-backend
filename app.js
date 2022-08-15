const fetchNode = require('node-fetch');
const express = require('express');
const app = express();
const port = 3001;
const jsonUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET")
	next();
  });
/**JSON FORMAT
 * 
 * {
		"title": "Uploads from everyone",
		"link": "https:\/\/www.flickr.com\/photos\/",
		"description": "",
		"modified": "2022-08-14T15:05:43Z",
		"generator": "https:\/\/www.flickr.com",
		"items": [
	   {
			"title": "H\u1ed9i kho\u00e1",
			"link": "https:\/\/www.flickr.com\/photos\/195119162@N06\/52284091057\/",
			"media": {"m":"https:\/\/live.staticflickr.com\/65535\/52284091057_ca04744445_m.jpg"},
			"date_taken": "2022-08-14T08:07:31-08:00",
			"description": " <p><a href=\"https:\/\/www.flickr.com\/people\/195119162@N06\/\">Phi Tr\u01b0\u1eddng 2022<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/195119162@N06\/52284091057\/\" title=\"H\u1ed9i kho\u00e1\"><img src=\"https:\/\/live.staticflickr.com\/65535\/52284091057_ca04744445_m.jpg\" width=\"180\" height=\"240\" alt=\"H\u1ed9i kho\u00e1\" \/><\/a><\/p> ",
			"published": "2022-08-14T15:05:43Z",
			"author": "nobody@flickr.com (\"Phi Tr\u01b0\u1eddng 2022\")",
			"author_id": "195119162@N06",
			"tags": ""
	   }
    }
 */

app.get('/', async (req, res) => {


    const response =  await fetchNode(jsonUrl); //fetch from api
    const rawData = await response.text(); //extract response in form of text
    const dataString = rawData.toString(); // convert raw data to string
    const correctString = dataString.substring(15, dataString.length - 1) //cut unnecessary part to make it a correct JSON format
    let actualJSON = JSON.parse(correctString); //convert processed string into JSON

    
    res.send(actualJSON.items); //send necessary data
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});