	const readline = require('readline');
	const fs = require('fs');
	var header1 =[];
	var json1=[];
	var temp1={};
	var heading1=true;
	var flag1=false;
	var header3 =[];
	var json3=[];
	var temp3={};
	var heading3=true;
	var flag3=false;
	var header4 =[];
	var json4=[];
	var temp4={};
	var heading4=true;
	var year = [];
	var aggregated_value = [];
	var json5 = [];
	var temp5 = {};

	const rl = readline.createInterface({
		input: fs.createReadStream('../csv/agri.csv')
	});


	rl.on('line', function(line) {
	//console.log(lineRecords.length);
	var lineRecords= line.split(',');
	var dataflag =false;
	for(var i=0;i<lineRecords.length;i++)
	{
		if(heading1)
		{ 
			header1[i]=lineRecords[i].trim();
	//console.log(header1[i].length+"------->"+header1[i]);
}
else if((header1[i]=="Particulars")|| (header1[i]=="3-2013"))
{
	//console.log(head1.indexOf(lineRecords[0]));


	if(lineRecords[0].includes("Foodgrain")&&!lineRecords[0].includes("Oilseeds")) {
		if((lineRecords[0].includes("Target"))||(lineRecords[0].includes("Achievements"))|| 
			(lineRecords[0].includes("Yield"))|| (lineRecords[0].includes("Area"))|| 
			(lineRecords[0].includes("Volume"))|| (lineRecords[0].includes("Other Cash Crops "))||
			(lineRecords[0].includes("Oilseeds Nine Oilseeds"))||(lineRecords[0].includes("Total"))) {
			break;
	}

	else if(i==0){
		temp1[header1[i]]=lineRecords[i];}
		else{
			temp1[header1[i]]=parseFloat(lineRecords[i+1].replace("NA",0));} 
	//console.log(temp1.length);
	//console.log(temp1[header1[i]]);
	dataflag=true;
}

}         
}

var dataflag3 =false;
for(var i=0;i<lineRecords.length;i++)
{
	if(heading3)
	{ 
		header3[i]=lineRecords[i].trim();
	}
	else if((header3[i]=="Particulars")|| (header3[i]=="3-2013"))
	{


		if(lineRecords[0].includes("Oilseeds"))
		{
			if(i==0){
				temp3[header3[i]]=lineRecords[i];
			}
			else{
				temp3[header3[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
			} 
	//console.log(temp3.length);
	//console.log(temp3[header3[i]]);
	dataflag3=true;
}
	//temp3[header3[i]]=temp3[header3[i]].replace("!",",").replace(/["]/g,"");
}         
}
var dataflag4 =false;
for(var i=0;i<lineRecords.length;i++)
{
	if(heading4)
	{ 
		header4[i]=lineRecords[i].trim();
	}
	else if((header4[i]=="Particulars")|| (/3-/i.test(header4[i])))
	{



		if(lineRecords[0].includes("Rice Yield Karnataka") || lineRecords[0].includes("Rice Yield Andhra Pradesh") || lineRecords[0].includes("Rice Yield Kerala") || lineRecords[0].includes("Rice Yield Tamil Nadu") )
		{
			if(i==0){
				temp4[header4[i]]=lineRecords[i];
	// console.log(temp4);
}
	// var sum=0;
	for(i=3;i<25;i++)
	{

		temp4[header4[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
	// sum += parseFloat(lineRecords[i]);
	// console.log(sum);


} 
	// temp4["year"]=sum;
	// console.log(temp4); 

	//console.log(temp4[header4[i]]);
	dataflag4=true;
}
}         
}




if(dataflag4)
{
	json4.push(temp4);
}
heading4=false; 

fs.writeFileSync("../JSON/southstating.json",JSON.stringify(json4),encoding="utf8");

temp4={};


if(dataflag3)
{
	json3.push(temp3);
}
heading3=false; 

fs.writeFileSync("../JSON/oilseeding.json",JSON.stringify(json3),encoding="utf8");
temp3={};




if(dataflag)
{
	json1.push(temp1);
}
heading1=false; 

fs.writeFileSync("../JSON/foodgraining.json",JSON.stringify(json1),encoding="utf8");


for(let i = 0;i <= 21;i++){
	aggregated_value[i] = 0;
}

temp1={};

if(/Agricultural Production Commercial \D/.test(lineRecords[0])){

	var temp_year = 1993;

	for(var i = temp_year;i <= 2014;i++){

		if(!year[i - temp_year]){
			year[i - temp_year] = i;
		}

		if(lineRecords[i - temp_year +4] === "NA"){
			aggregated_value[i - temp_year] = aggregated_value[i - temp_year] + 0;
		}
		else{
			aggregated_value[i - temp_year] = aggregated_value[i - temp_year] + parseFloat(lineRecords[i - temp_year + 4]);
		}

	}

}

});


	rl.on('close',function()
	{

		for (let n = 0; n < aggregated_value.length ; n++){

			temp5 = {};
			temp5["Year"] = year[n];
			temp5["Aggregated value of all Commercial crops (Ton mn)"] = aggregated_value[n];
			
			json5.push(temp5);
			
		}
		
		fs.writeFileSync("../JSON/threecommercialing.json",JSON.stringify(json5),encoding="utf8");
	});


