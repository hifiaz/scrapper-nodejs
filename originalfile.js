let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('http://startupjobs.asia/job/search?w=jobs&q=&l=Anywhere&t=Freelance#searchResult')
	.then((response) => {
		if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      var today = new Date().toLocaleString();
      var startupasiaList = [];
      $('.items > .SingleJob').each(function(i, elem) {
        const unix = $(this).find('a').eq(2).attr('href');
        startupasiaList[i] = {
          Id: $(this).find().text().trim(),
          Unix: unix.slice(5,10),
          Position: $(this).find('.JobRole').text().trim(),
          Company: $(this).find('.CompanyName').text().trim(),
          Location: $(this).find('.JobLocation').text().trim(),
          Type: $(this).find('.jobtypehome').text().trim(),
          Url: 'http://startupjobs.asia' + $(this).find('a').eq(2).attr('href'),
          Publish: $(this).value = today,
          created_at: $(this).value = today,
          updated_at: $(this).value = today
        }      
      });
      let startupasiaListTrimmed = startupasiaList.filter(n => n != undefined ) 
      fs.writeFile('data/startupasia.json', 
        JSON.stringify(startupasiaListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  