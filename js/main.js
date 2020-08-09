var HttpClient = function () {
	this.get = function (aUrl, aCallback) {
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function () {
		if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
		}
		anHttpRequest.open("GET", aUrl, true);
		anHttpRequest.send(null);
	}
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var issue = getUrlVars()["issue"];
console.log(issue);

//alert(issue);
// INDIVIDUAL ARTICLES

var client = new HttpClient();
client.get('https://api.are.na/v2/channels/'+issue+'contents', function(response) {
	console.log(response);
	var obj = JSON.parse(response);
	
	for(var i = 0; i < obj.contents.length; i++)
	{
	    var blocks = obj.contents[i];
		console.log(obj.contents[i].id)
		var num = i;
		var title = obj.contents[i].title;
		var dsc = obj.contents[i].description;
		var url = obj.contents[i].source.url;
		insertData(num, title, url, dsc);
	}
	
	var issueTitle=document.getElementById('issueTitle');
	var issueClean = issue.replace(/[^a-zA-Z0-9 ]/g, "");
	issueTitle.innerHTML=issueClean.toUpperCase();

});

function insertData(num, title, url, description) {
  var newRow=document.getElementById('blockTable').getElementsByTagName('tbody')[0].insertRow();
  newRow.innerHTML="<td>"+num+"</td><td><a target='_blank' href='"+url+"'>"+title+"</a></td><td>"+description+"</td>";
}
       
       
// ISSUES

var issues = new HttpClient();
issues.get('https://api.are.na/v2/channels/spiritualengineering_main/contents', function(response) {
//	console.log(response);
	var obj = JSON.parse(response);
//	alert(obj.contents.length)
	
	for(var i = 0; i < obj.contents.length; i++)
	{
		console.log(obj.contents[i].id)
		var num = i+1;
		var title = obj.contents[i].title.toLowerCase();
		var dsc = obj.contents[i].metadata.description;
		var date = obj.contents[i].added_to_at;
		insertIssue(num, title, dsc, date);
	}

});


function insertIssue(num, title, description, date) {
  var html_to_insert = "<div class='column issue-block is-one-quarter'><a href='./issue/?issue="+title+"'><p class='issue-number'>"+title.toUpperCase() +"</p><p class='issue-title'>"+description+"</p><p class='issue-subtitle'>"+date+"</p></a></div>";
  document.getElementById('issueSection').insertAdjacentHTML('beforeend', html_to_insert);
}
       
       

    