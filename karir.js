let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://www.karir.com/search')
	.then((response) => {
		if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      var karirList = [];
      $('.opportunities-list > li').each(function(i, elem) {
        karirList[i] = {
          Position: $(this).find('h2').text().trim(),
          Compay: $(this).find('h3').text().trim(),
          Location: $(this).find('.tdd-location').first().text().trim(),
          Type: $(this).find('job-type').text().trim(),
          url: $(this).find('a').attr('href'),
          published: $(this).find('time').text().trim()
        }      
      });
      let karirListTrimmed = karirList.filter(n => n != undefined ) 
      fs.writeFile('data/karir.json', 
        JSON.stringify(karirListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  