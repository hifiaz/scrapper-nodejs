let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://www.loker.id/cari-lowongan-kerja?keyword=freelance&search_by_tax_lokasi=0')
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
      $('.job-box').each(function(i, elem) {
        topkarirList[i] = {
          Position: $(this).find('h3').text().trim(),
          Compay: $(this).find('tr > td').eq(1).text().trim(),
          Location: $(this).find('tr > td').eq(3).text().trim(),
          Type: $(this).find('tr > td').eq(5).text().trim(),
          url: $(this).find('a').attr('href'),
          published: $(this).value = today
        }      
      });
      let topkarirListTrimmed = topkarirList.filter(n => n != undefined ) 
      fs.writeFile('data/lokerid.json', 
        JSON.stringify(topkarirListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
    }
	}, (error) => console.log(error));
  