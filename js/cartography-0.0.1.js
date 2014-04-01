$(document).ready(function(){
	app.c.init();
	app.c.updateTweets();
	app.v.init();
});

/////////////////////////////////////////////////////

app={m:{},v:{},c:{}};

/////////////////////////////////////////////////////

app.m.mapOptions={
  markerStyle:{
      initial: {
        fill: '#000',
        stroke: '#0ff'
      }
    },
    markers: [
    ]
  };


app.m.tweets=[];
/////////////////////////////////////////////////////

app.c.init=function(){
	app.c.initBounds();
};

app.c.initBounds=function(){
	app.m.bounds=davis.quickBox();
};



app.c.updateTweets=function(){
	
	$.ajax({
		url:"http://peopleofthebit.com/dev_club/cartography/php/index.php",
		dataType:"json",
		success:function(data,success){
		app.m.tweets=[];
		app.m.tweets=data;
		for (var i=0;i<app.m.tweets.length;i++){
			console.log(app.m.tweets[i]);
			var d={};
			d.fill="#ff0";
			d.r=5
			d.name=app.m.tweets[i].message;
			var loc=app.m.tweets[i].location;
			loc=loc.split(",");

			d.latLng=[ parseFloat(loc[0]),parseFloat(loc[1]) ];
			app.m.mapOptions.markers.push(d);
			}
    	app.m.worldMap=$('#world-map').vectorMap(app.m.mapOptions);
		}
	});

	
}

/////////////////////////////////////////////////////

app.v.init=function(){
	$("body").html(app.v.layout());
};

app.v.layout=function(){
	var d="";
 	d+="<div id='world-map' style='width: "+app.m.bounds.width+"px; height: "+app.m.bounds.height+"px'></div>";
	return d;
};