const Nightmare = require('nightmare');
let cheerio = require('cheerio'); 
let fs = require('fs');

const nightmare = Nightmare()
      nightmare
        .goto('https://vuejobs.com/freelance-vuejs-jobs')
        .evaluate(function(){
            //here is where I want to return the html body
            return document.body.innerHTML;
        })
        .then(function(body){
            //loading html body to cheerio
            var $ = cheerio.load(body);
            fs.writeFile('htmls/vuejobs.html', body, (err)=>{
                console.log('File successfully written!');
            })
        })
        