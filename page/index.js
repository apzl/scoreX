var MY_KEY = config.API_KEY;

var today = formatDate(new Date());

function formatDate(date) {						//convert date to yyyy-mm-dd format
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
function nextDay(date_str,days){					// increment date by 1
	let parts = date_str.split("-");
	let dt = new Date(
	  parseInt(parts[0], 10),      // year
	  parseInt(parts[1], 10) - 1,  // month (starts with 0)
	  parseInt(parts[2], 10)       // date
	);
	dt.setDate(dt.getDate() + days);
	parts[0] = "" + dt.getFullYear();
	parts[1] = "" + (dt.getMonth() + 1);
	if (parts[1].length < 2) {
	  parts[1] = "0" + parts[1];
	}
	parts[2] = "" + dt.getDate();
	if (parts[2].length < 2) {
	  parts[2] = "0" + parts[2];
	}
	return parts.join("-");
	
	
  }
  matchDay = nextDay(today,1);
  prevDay = nextDay(today,-1);
fetchData();
async function fetchData (){
const  url=`https://api.football-data.org/v2/matches?dateFrom=${prevDay}&dateTo=${matchDay}`;
const OPTIONS = {
	method: 'GET',
	headers: {
	  'X-Auth-Token': MY_KEY,
	}
  };
let response = await fetch(url,OPTIONS).then(response => response.json());
console.log(response);
if(response.matches!= null){
const html = response.matches.map(matches=>{
	
	  
	var dm = new Date(matches.utcDate);
	var dd = new Date();
	if(dm.getDay()==dd.getDay()){ //get the matches by local time
		/*if (matches.STATUS == "FINISHED"){ 
			var matchTime = "";
		} else if (matches.STATUS=="SCHEDULED"){
			var matchTime = new Date (matches.utcDate).toString();
		} */  
		return `
			<div class="match-data">
				<div class="home-team-name"><p>${matches.homeTeam.name}</p></div>
				<div class="home-team-logo"><img src="" alt=""></div>
				<div class="match-details">
					<div class="match-score">${matches.score.fullTime.homeTeam}-${matches.score.fullTime.awayTeam}</div>
					<div class="match-time"><p></p></div>
				</div>
			<div class="away-team-logo"><img src="" alt=""></div>
				<div class="away-team-name"><p>${matches.awayTeam.name}</p></div>
		</div>`;}
	
});
console.log(html);
document.querySelector('.matches').insertAdjacentHTML('afterbegin',html);
}
}

