let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('http://startupjobs.asia/job/search?w=jobs&q=&l=Anywhere&t=Freelance#searchResult')
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
      var startupasiaList = [];
      $('.items > .SingleJob').each(function(i, elem) {
        startupasiaList[i] = {
          Id: $(this).find().text().trim(),
          Position: $(this).find('.JobRole').text().trim(),
          Compay: $(this).find('.CompanyName').text().trim(),
          Location: $(this).find('.JobLocation').text().trim(),
          Type: $(this).find('.jobtypehome').text().trim(),
          Url: 'http://startupjobs.asia' + $(this).find('a').eq(2).attr('href'),
          Published: $(this).value = today,
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
  