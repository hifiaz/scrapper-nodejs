let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'quickjobs',
});
connection.connect();

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
          // Id: $(this).find().text().trim(),
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
        let startupasiaListTrimmed = startupasiaList.filter(n => n != undefined ) 
        let query = connection.query('insert ignore jobs set ?', startupasiaList[i], function(err, result){
          if(err){
            console.log(err);
            return
          }
          console.log(result);
        }); 
      });
    }
	}, (error) => console.log(error));
  