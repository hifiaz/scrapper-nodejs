let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://id.jobsdb.com/ID/ID/Search/FindJobs?KeyOpt=COMPLEX&JSRV=1&RLRSF=1&JobCat=1&JSSRC=HPSS')
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
      var jobsdbList = [];
      $('.result-sherlock-cell').each(function(i, elem) {
        jobsdbList[i] = {
          Position: $(this).find('h3').text().trim(),
          Compay: $(this).find('p > a').text().trim(),
          Location: $(this).find('.job-location > span').first().text().trim(),
          Type: $(this).find('job-type').text().trim(),
          url: $(this).find('.posLink').attr('href'),
          published: $(this).value = today
        }      
      });
      let jobsdbListTrimmed = jobsdbList.filter(n => n != undefined ) 
      fs.writeFile('data/jobsdb.json', 
        JSON.stringify(jobsdbListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  