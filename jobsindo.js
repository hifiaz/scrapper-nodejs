let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://jobindo.com/index.php?mod=search&job_title=&&')
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
      var alamat = 'https://jobindo.com/';
      var karirList = [];
      $('.row > .col-sm-12').each(function(i, elem) {
        karirList[i] = {
          Position: $(this).find('td > a > h4').text().trim(),
          Compay: $(this).find('td > a > font').text().trim(),
          Location: $(this).find('tr > td > strong').eq(2).text().trim(),
          Type: $(this).find('job-type').text().trim(),
          url: $(this).find('a').prepend(alamat).attr('href'),
          published: $(this).value = today
        }      
      });
      let karirListTrimmed = karirList.filter(n => n != undefined ) 
      fs.writeFile('data/jobsindo.json', 
        JSON.stringify(karirListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  