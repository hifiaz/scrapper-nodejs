const Nightmare = require('nightmare');
let cheerio = require('cheerio'); 
let fs = require('fs');

const nightmare = Nightmare()
      nightmare
        .goto('https://www.kalibrr.com/job-board/t/freelance/1')
        .evaluate(function(){
            //here is where I want to return the html body
            return document.body.innerHTML;
        })
        .then(function(body){
            //loading html body to cheerio
            var $ = cheerio.load(body);
            fs.writeFile('htmls/kalibrr.html', body, (err)=>{
                console.log('File successfully written!');
            })
        })
        