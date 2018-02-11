let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://www.careerjet.co.id/cari/kerja?s=&l=')
	.then((response) => {
		if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd;
      } 
      if(mm<10){
          mm='0'+mm;
      } 
      var today = dd+'/'+mm+'/'+yyyy;
      var topkarirList = [];
      $('.job').each(function(i, elem) {
        topkarirList[i] = {
          Position: $(this).find('h2').text().trim(),
          Compay: $(this).find('p > .company_compact').text().trim(),
          Location: $(this).find('p > .locations_compact').first().text().trim(),
          Type: $(this).find('job-type').text().trim(),
          url: $(this).find('a').attr('href'),
          published: $(this).value = today
        }      
      });
      let topkarirListTrimmed = topkarirList.filter(n => n != undefined ) 
      fs.writeFile('data/careerjet.json', 
        JSON.stringify(topkarirListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  