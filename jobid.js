let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('http://www.jobs.id/lowongan-kerja')
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
      var karirList = [];
      $('.single-job-ads').each(function(i, elem) {
        karirList[i] = {
          Position: $(this).find('h3').text().trim(),
          Compay: $(this).find('p > a').text().trim(),
          Location: $(this).find('.location').first().text().trim(),
          Type: $(this).find('job-type').text().trim(),
          url: $(this).find('a').attr('href'),
          published: $(this).value = today
        }      
      });
      let karirListTrimmed = karirList.filter(n => n != undefined ) 
      fs.writeFile('data/jobid.json', 
        JSON.stringify(karirListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  