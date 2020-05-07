const api = require('./APIrequest')
const express= require('express');
const app=express();

const port = process.env.PORT || 3000;

function parse(data) {
	  console.log("Parse");
	  
	  var html= "<head><title>Konfhub</title></head><table border='1'>";
	  // var cols = ["city","confEndDate","confName","confRegUrl","confStartDate","confUrl","conference_id","country","emailId","entryType","imageURL","keywordSupport","lat","long","searchTerms","state","twitter_handle","user_id","venue"]	
	  var cols = ["city","confName","confStartDate","confUrl","state","country","entryType","venue"]		  
	  
	  html += "<ul style='background-color:#2F3B59;color:white'>";
	  UI=data["paid"].concat(data["free"])
	  // permittedValues = array.map(value => value.key);
	  UI = UI.sort(function(a,b){var x=(new Date(a.confStartDate))>(new Date(b.confStartDate))?1:-1; return x})
	  UI.forEach(function(element) {
	  		
		html+="<li style='padding:5px 10px'>"+"Conference on -> <b>"+element["confStartDate"]+"</b> at ";

		if(element["state"])
			html+=element["state"]+","

		html+=element["country"]
		
		if(element["entryType"]=="Paid")
			html+="<nav style='color:red'> <b>Tickets:"+element["entryType"]+"</b></nav>";
		else
			html+="<nav style='color:yellow'> <b>Tickets:"+element["entryType"]+"</b></nav>";			

		html+="<ul>"+"<li style='padding:5px 10px'><b style='color:white;background-color:black;padding:2px'>"+element["confName"]+"</b></li>";
		html+="<li style='padding:5px 10px'>Duration : <b>"+((new Date(element["confEndDate"]))-(new Date(element["confStartDate"])))/(1000*24*60*60)+" days</b></li>";
		html+="<li style='padding:5px 10px'>Venue : <b>"+element["venue"]+"</b></li>";
		html+="<a href='"+element["confUrl"]+"'><button style='background-color: #4CAF50;color:#ffffff;padding:5px 10px;cursor:pointer;'> Conference URL"+"</button></a>";
		html+="<a href='"+element["confRegUrl"]+"'><button style='background-color: #4CAF50;color:#ffffff;padding:5px 10px;cursor:pointer;'> Registration URL"+"</button></a>";
		html+="</ul>"+"</li>"
		html+="<br>"
	  })

	  html += "</ul>";

	  // for (var i = 0; i < 10; i++) {
	  //   html += "<tr>";
	  //   html += "<td>" + data.Search[i].Title + "</td>";
	  //   html += "<td>" + data.Search[i].Type + "</td>";
	  //   html += "</tr>";
	  // }
	  // html += "</table>";
	  // console.log(html);
	  return html;
}





app.get("/request",(req,res)=>{
	 
	 		api.callApi(function(response){
                // console.log(JSON.stringify(response));
                res.write(parse(JSON.parse(response)));
                res.end();
            });
})


app.get('*',(req,res)=>{
  res.json("Welcome to Konfhub :)");
})

app.listen(port, () => console.log(`Listening on port ${port}`));