let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 
// let mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: 'localhost',
//   port: '8889',
//   user: 'root',
//   password: 'root',
//   database: 'quickjobs',
// });
// connection.connect();

      const $ = cheerio.load(fs.readFileSync('htmls/kalibrr.html'));
      var today = new Date().toLocaleString();
      var vuejobsList = [];
      $('ul > li').each(function(i, elem) {
        // const unix = $(this).find('a').attr('href');
        vuejobsList[i] = {
          Position: $(this).find('.job-card-info > h3').text().trim(),
        //   Unix: 'VUE'+unix.slice(25,28),
          Company: $(this).find('.position__location > a').text().trim(),
          Location: $(this).find('.position__location > span').first().text().trim(),
          Type: $(this).find('.position__type').text().trim(),
          Url: $(this).find('a').attr('href'),
          Publish: $(this).value = today,
          created_at: $(this).value = today,
          updated_at: $(this).value = today
        }
        // let query = connection.query('insert ignore jobs set ?', vuejobsList[i], function(err, result){
        //   if(err){
        //     console.log(err);
        //     return
        //   }
        //   console.log(result);
        // }); 
      });
      let vuejobsListTrimmed = vuejobsList.filter(n => n != undefined ) 
      fs.writeFile('data/kalibrr.json', 
        JSON.stringify(vuejobsListTrimmed, null, 4), (err)=>{
        console.log('File successfully written!');
      })
  