let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://news.detik.com/indeks')
	.then((response) => {
		if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); 
      var detikList = [];
      $('#indeks-container > li').each(function(i, elem) {
        detikList[i] = {
          title: $(this).find('h2').text().trim(),
          url: $(this).find('a').attr('href'),
          published: $(this).find('.labdate').text().trim()
        }      
      });
      let detikListTrimmed = detikList.filter(n => n != undefined ) 
      fs.writeFile('data/detik.json', 
        JSON.stringify(detikListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  