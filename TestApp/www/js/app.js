// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ui.bootstrap','ionic','angles','ngCordova'])
var db=window.openDatabase("MainData1.db", "1.0", "MainData1.db", 2000);
app.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	}
	
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }	
	$cordovaSQLite.execute(db, "CREATE TABLE data (id integer primary key, questionset text)");
	$cordovaSQLite.execute(db, "CREATE TABLE data1 (id integer primary key, questionset text)");
	$cordovaSQLite.execute(db, "CREATE TABLE worddb (id integer primary key, wordlist text)");
		var str1=JSON.stringify(temp);  		
		var query = "SELECT questionset FROM data";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {              
				//console.log("Record present");
            } else {				
				var query = "INSERT INTO data (questionset) VALUES (?)";
				$cordovaSQLite.execute(db, query, [str1]).then(function(res) {
         	
					}, function (err) {
						console.error(err);
					});	              
            }
        }, function (err) {
            //console.error(err);
        });		
		var str=JSON.stringify(temp1);  		
		var query = "SELECT questionset FROM data1";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {              
				//console.log("Record present");
            } else {				
				var query = "INSERT INTO data1 (questionset) VALUES (?)";
				$cordovaSQLite.execute(db, query, [str]).then(function(res) {
         	
					}, function (err) {
						//console.error(err);
					});	              
            }
        }, function (err) {
            console.error(err);
        });	
		var query = "SELECT wordlist FROM worddb";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {              
				wordlistmain=JSON.parse(res.rows.item(0).wordlist);
            } else {			
				         
            }
        }, function (err) {
           // console.error(err);
        });		
  });
})
	var result=0;
    var wordlistmain=[];
	var retainvalue=[];
	var testcorrect=[];
	var selectedtest;
	var mytimeout = null;

	app.constant('$ionicLoadingConfig', {
	template: '<ion-spinner></ion-spinner>',
	  noBackdrop:false,
	  hideOnStateChange:true
	});
	app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])	
	app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {	
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tabs.home', {
		cache: false,
        url: "/home",
        views: {
          'home-tab': {
            templateUrl: "templates/home.html",
            controller: 'HomeTabCtrl'
          }
        }
      })
      .state('tabs.testlist', {
		cache: false,
	    url: "/testlist",
        views: {
          'home-tab': {
            templateUrl: "templates/testlist.html",
			controller:'testctrl'
          }
        }
      })
	   .state('tabs.highfrqwords', {
		   cache: false,
	    url: "/highfrqwords",
		views: {
          'home-tab': {
            templateUrl: "templates/highfrqwords.html",
			controller:'highfrqwordsCtrl'
          }
        }
      })
	   .state('tabs.testlistSentence', {
		cache: false,
	    url: "/testlistSentence",
        views: {
          'home-tab': {
            templateUrl: "templates/testlistSentence.html",
			controller:'testlistSentenceCtrl'
          }
        }
      })  
	   .state('tabs.previewresult', {
		cache: false,
        url: "/previewresult",
        views: {
          'home-tab': {
            templateUrl: "templates/previewresult.html",
			controller:'previewresultctrl'
			
          }
        }
      })
	   .state('tabs.previewsresult', {
		cache: false,
        url: "/previewsresult",
        views: {
          'home-tab': {
            templateUrl: "templates/previewsresult.html",
			controller:'previewsresultctrl'
		  }
        }
      })
	  .state('tabs.result', {
		cache: false,
        url: "/result/:resultobj",
        views: {
          'home-tab': {
            templateUrl: "templates/result.html",
			controller:'resultctrl'
          }
        }
      })  
	   .state('tabs.sresult', {
		cache: false,
        url: "/sresult/:resultobj",
        views: {
          'home-tab': {
            templateUrl: "templates/sresult.html",
			controller:'resultctrl1'
          }
        }
      })
      .state('tabs.loadtest', {
		cache: false,
        url: "/loadtest/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/loadtestview.html",
			controller:'loadtestctrl'
          }
        }
      })
	   .state('tabs.loadStest', {
		cache: false,
        url: "/loadStest/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/loadStestview.html",
			controller:'loadStestctrl'
          }
        }
      })
	  .state('tabs.loadwordlist', {
		cache: false,
        url: "/loadwordlist/:id",
        views: {
          'home-tab': {
            templateUrl: "templates/loadwordlistview.html",
			controller:'loadwordlistCtrl'
          }
        }
      })
	.state('tabs.setting', {
		cache: false,
        url: "/setting",
        views: {
          'setting-tab': {
            templateUrl: "templates/setting.html",
			controller:'settingCtrl'
          }
        }
      })	  	  
     .state('tabs.contact', {
		cache: false,
        url: "/contact",
        views: {
          'contact-tab': {
            templateUrl: "templates/contact.html",
			controller:'progressctrl'
          }
        }
      });
     $urlRouterProvider.otherwise("/tab/home");
  })
	app.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
	$ionicConfigProvider.navBar.alignTitle('center')

}]);
	app.config(function ($cordovaAppRateProvider) {
		document.addEventListener("deviceready", function () {
		var prefs = {
		 language: 'en',
		 appName: 'PreGre',
		 androidURL: 'market://details?id=com.phantom.pregre',   
	   };
		$cordovaAppRateProvider.setPreferences(prefs);   
	}, false);
	});
	app.controller('previewresultctrl', function($scope,$timeout) { 
    $scope.testanalysis=selectedtest;
	$scope.retainvalueobj=retainvalue;
	var index=0;
	$scope.questionno=1;
	$scope.questiontitle=selectedtest.question[index].questiontitle;
	$scope.questionoptions=selectedtest.question[index].options;
	$scope.questionanswer=selectedtest.question[index].answer[0];
	$scope.retainvalue=retainvalue[index];
	$scope.loadnextquestion=function(){
	
		if(selectedtest.question[index+1]){
		$scope.questiontitle=selectedtest.question[index+1].questiontitle;
	    $scope.questionoptions=selectedtest.question[index+1].options;
		$scope.questionanswer=selectedtest.question[index+1].answer[0];
		$scope.retainvalue=retainvalue[index+1];
		$scope.questionno++;
			if(index==selectedtest.question.length-2)
			{			
				$scope.flag=true;
			}
			index++;
			
		}		
	}
	$scope.loadpreviousquestion=function(){
		if(selectedtest.question[index-1]){
			$scope.flag=false;
		$scope.questiontitle=selectedtest.question[index-1].questiontitle;
	    $scope.questionoptions=selectedtest.question[index-1].options;
		$scope.questionanswer=selectedtest.question[index-1].answer[0];
			$scope.retainvalue=retainvalue[index-1];
			$scope.questionno--;
		index--;
	
		}
	}	
	
	$scope.loadquestion=function(qindex){
		$scope.questiontitle=selectedtest.question[qindex].questiontitle;
		$scope.questionoptions=selectedtest.question[qindex].options;
		$scope.questionanswer=selectedtest.question[qindex].answer[0];
		$scope.retainvalue=retainvalue[qindex];
		$scope.questionno=qindex+1;
		if(qindex==24)
		{
			
			$scope.flag=true;
		}
		else 
			 $scope.flag=false;
		index=qindex;
	};
	});
	app.controller('previewsresultctrl', function($scope,$timeout) {
    
    $scope.testanalysis=selectedtest;
	$scope.retainvalueobj=retainvalue;
	var index=0;
	$scope.questionno=1;
	$scope.testcorrect=testcorrect;
	$scope.questiontitle=selectedtest.question[index].questiontitle;
	$scope.questionoptions=selectedtest.question[index].options;
	$scope.wrongf=[];
    clearwf();
	$scope.questionanswer=selectedtest.question[index].answer[0];
	$scope.questionanswer1=selectedtest.question[index].answer[1];
	for(i=0;i<$scope.questionoptions.length;i++){
		
		if($scope.questionoptions[i].check)
		{				
			if((parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer)) && (parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer1))) 
			{   $scope.wrongf[i]=true;				
			}			
		}		
	}
	
	$scope.loadnextquestion=function(){		
		if(selectedtest.question[index+1]){
		$scope.questiontitle=selectedtest.question[index+1].questiontitle;
	    $scope.questionoptions=selectedtest.question[index+1].options;
		$scope.questionanswer=selectedtest.question[index+1].answer[0];
		$scope.questionanswer1=selectedtest.question[index+1].answer[1];
	    $scope.questionno++;
		if(index==selectedtest.question.length-2)
		{			
				$scope.flag=true;
		}
		clearwf();
		for(i=0;i<$scope.questionoptions.length;i++){
			if($scope.questionoptions[i].check)
			{			
			
				if((parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer)) && (parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer1))) 
				{	
					$scope.wrongf[i]=true;				   
				}			
			}		
		}
		index++;
		
		}		
	}
	$scope.loadpreviousquestion=function(){
		if(selectedtest.question[index-1]){
			$scope.flag=false;
		$scope.questiontitle=selectedtest.question[index-1].questiontitle;
	    $scope.questionoptions=selectedtest.question[index-1].options;
		$scope.questionanswer=selectedtest.question[index-1].answer[0];
		$scope.questionanswer1=selectedtest.question[index-1].answer[1];
	    $scope.questionno--;
		clearwf();
		for(i=0;i<$scope.questionoptions.length;i++){
			if($scope.questionoptions[i].check)
			{			
				
				if((parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer)) && (parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer1))) 
				{				
				
					$scope.wrongf[i]=true;
			       
				}			
			}		
		}			
		index--;
		}
	}		
	$scope.loadquestion=function(qindex){
		$scope.questiontitle=selectedtest.question[qindex].questiontitle;
		$scope.questionoptions=selectedtest.question[qindex].options;
		$scope.questionanswer=selectedtest.question[qindex].answer[0];
		$scope.questionanswer1=selectedtest.question[qindex].answer[1];
	    $scope.questionno=qindex+1;
		clearwf();
		for(i=0;i<$scope.questionoptions.length;i++){
			if($scope.questionoptions[i].check)
			{			
				
				if((parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer)) && (parseInt($scope.questionoptions[i].value)!=parseInt($scope.questionanswer1))) 
				{				
					
					$scope.wrongf[i]=true;
								
				}			
			}		
		}	
		if(qindex==9)
		{			
			$scope.flag=true;
		}
		else 
			 $scope.flag=false;
		index=qindex;
	};
	function clearwf(){
		for(i=0;i<6;i++){
			$scope.wrongf[i]=false;	
		
		}		
	}	
});
	app.controller('HomeTabCtrl', function($scope,$timeout) {
	 $timeout.cancel(mytimeout);		
	
	});
    app.controller('settingCtrl', function($scope,$timeout,$cordovaSQLite,$cordovaAppRate,$timeout) {	
	  $timeout.cancel(mytimeout);
		$scope.chkbox=function(){			
			if(document.getElementById("chkbox").checked){						
				var str1=JSON.stringify(words);  		
				var query = "delete FROM worddb";
				$cordovaSQLite.execute(db, query).then(function(res) {
					if(res) {              
						
						wordlistmain=[];
					} else {			
						     
					}
				}, function (err) {
					console.error(err);
				});
			} 			
			
		}
		$scope.rateapp=function(){
			$cordovaAppRate.promptForRating(true).then(function (result) { 
		});}
	});
	app.controller('highfrqwordsCtrl', function($scope,$cordovaSQLite,$ionicLoading ,$timeout,$state) {
	    $timeout.cancel(mytimeout);
		var count=0,strtindex=0;
		if(wordlistmain.length==0){	
         $ionicLoading.show(); 		
		var query = "SELECT wordlist FROM worddb";
			$cordovaSQLite.execute(db, query).then(function(res) {
					if(res.rows.length > 0) {              
						
						wordlistmain=JSON.parse(res.rows.item(0).wordlist);
						 $scope.wordlistmain=wordlistmain;
						 $ionicLoading.hide(); 
					} else {
							 temp1=shuffleArray(words);
							 for(i=0;i<temp1.length;i++){
								 var temp={};
								 if(i!=0){
									if(i%25==0 || i==799){
										count++
									   temp.title="List "+" "+count;
									   temp.wordlist=temp1.slice(strtindex,i);
									   strtindex=i;
									   wordlistmain.push(temp);			   
									}
								 }	 
							}							 
							$scope.wordlistmain=wordlistmain;
                            var str=JSON.stringify(wordlistmain); 							 
							var query = "INSERT INTO worddb (wordlist) VALUES (?)";
							$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                                   $ionicLoading.hide();  								
								}, function (err) {
									console.error(err);
							});	              
					}
				}, function (err) {
					$ionicLoading.hide(); 
					console.error(err);
			});	
			
			
		}		
		else{		
			$scope.wordlistmain=wordlistmain;
			$ionicLoading.hide();			
		}

function shuffleArray(words) {
			  var m = words.length, t, i;
			  // While there remain elements to shuffle
			  while (m) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);
				// And swap it with the current element.
				t = words[m];
				words[m] = words[i];
				words[i] = t;
			  }         
			  return words;
			}

	$scope.back=function(){
		
		$state.go('tabs.home');
		
	}			
	});
	app.controller('loadwordlistCtrl', function($scope,$timeout,$stateParams,$state,$cordovaSQLite,$ionicLoading,$ionicSlideBoxDelegate,$ionicSideMenuDelegate) {
		$scope.testtitle=$stateParams.id;
	 
		for(index=0;index<wordlistmain.length;index++)
		{	
			if(wordlistmain[index].title==$stateParams.id)
			{					
				$scope.words=shuffleArray(wordlistmain[index].wordlist);
            		
				break;
			}
 		}
	    if(wordlistmain[index].count){
			$scope.item=wordlistmain[index].count;
		}
        $scope.addtomaster=function(windex){			
            wordlistmain[index].count=wordlistmain[index].count||[];
			wordlistmain[index].count[0]=wordlistmain[index].count[0] || {};
         	wordlistmain[index].count[0].type="success";
			wordlistmain[index].count[0].value=wordlistmain[index].count[0].value||0;			
			if(wordlistmain[index].wordlist[windex].isdifficult){
				
				wordlistmain[index].count[1].value--;
			}	
	        wordlistmain[index].count[0].value++;		
			wordlistmain[index].wordlist[windex].ismaster=true;	
			delete wordlistmain[index].wordlist[windex].isdifficult;       
			$scope.item=wordlistmain[index].count;	
		
			if($ionicSlideBoxDelegate.currentIndex()==24){
				 $ionicSideMenuDelegate.toggleRight();			
			}
			else{				
			
            $ionicSlideBoxDelegate.next();
			} 
            var str=JSON.stringify(wordlistmain);  	
			var query="UPDATE worddb SET wordlist=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                        //console.log(res);
			}, function (err) {
				console.error(err);
			});    			
		}			
		$scope.hidefunctionmaster=function(windex){					
			if(wordlistmain[index].wordlist[windex].ismaster){
			    return true;
			}
		}
		$scope.hidefunctiondifficult=function(windex){					
			if(wordlistmain[index].wordlist[windex].isdifficult){
			    return true;
			}
		}	
		$scope.addtodifficult=function(windex){
			wordlistmain[index].count=wordlistmain[index].count||[];
			if(!wordlistmain[index].count[0]){
				wordlistmain[index].count[0]=wordlistmain[index].count[0] || {};
				wordlistmain[index].count[0].value=0;
				wordlistmain[index].count[0].type="success"; 
			}
			wordlistmain[index].count[1]=wordlistmain[index].count[1] || {};
         	wordlistmain[index].count[1].type="danger";
			wordlistmain[index].count[1].value=wordlistmain[index].count[1].value||0;	
			wordlistmain[index].wordlist[windex].isdifficult=true;
			if(wordlistmain[index].wordlist[windex].ismaster){
				wordlistmain[index].count[0].value--;				
			}			
			wordlistmain[index].count[1].value++;		
            delete wordlistmain[index].wordlist[windex].ismaster; 			
			$scope.item=wordlistmain[index].count;
			if($ionicSlideBoxDelegate.currentIndex()==24){
				$ionicSideMenuDelegate.toggleRight();			
			}
			else{
				
			
            $ionicSlideBoxDelegate.next();
			} 

			var str=JSON.stringify(wordlistmain);  	
			var query="UPDATE worddb SET wordlist=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                        //console.log(res);
			}, function (err) {
				console.error(err);
			});		
			//$ionicSlideBoxDelegate.next();
					
		}	
        $scope.loadword=function(index){
        		$ionicSlideBoxDelegate.slide(index, 500)	

        };
		 function shuffleArray(words) {
			  var m = words.length, t, i;
			  // While there remain elements to shuffle
			  while (m) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);
				// And swap it with the current element.
				t = words[m];
				words[m] = words[i];
				words[i] = t;
			  }         
			  return words;
			}	
        $scope.exitword=function(){
			var str=JSON.stringify(wordlistmain);  	
			var query="UPDATE worddb SET wordlist=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                        //console.log(res);
			}, function (err) {
				console.error(err);
			});
			$state.go('tabs.highfrqwords');
		}
	});	
	app.controller('progressctrl', function($scope,$cordovaSQLite,$ionicLoading,$timeout) {
	  var masterwordcount=0,difficultwordcount=0;
	  $scope.stacked = []; 
	  $timeout.cancel(mytimeout);
	  var temp,temp1;
	  $scope.tcount=0;
	  $scope.scount=0;
	  $ionicLoading.show(); 	
	   var query = "SELECT questionset FROM data";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
               	temp=JSON.parse(res.rows.item(0).questionset);
				for(i=0;i<temp.length;i++)
				{
					if(temp[i].completed)
					{			
						$scope.tcount++;					
					}
				}			 
				
            } else {
              console.log("error")
			  $ionicLoading.hide(); 
            }
        }, function (err) {
            console.error(err);
		   	$ionicLoading.hide(); 
        });
		var query = "SELECT questionset FROM data1";
		 $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
				temp1=JSON.parse(res.rows.item(0).questionset);
				for(i=0;i<temp1.length;i++)
				{
					if(temp1[i].completed)
					{
						$scope.scount++;
					}
				}

			$scope.data = {
				labels : ["Test Completion", "Sentence Equivalnce"],
				datasets : [
				{
					label:"TestGiven",
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data : [$scope.tcount, $scope.scount]
				},
				{
					label:"Total",
					fillColor: "rgba(220,220,220,0.5)",
					strokeColor: "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
				
					data : [20, 20]
				}
				], 
		};			
			$ionicLoading.hide();  			
			}else {
              console.log("error")
			  $ionicLoading.hide(); 
            }
        }, function (err) {
            console.error(err);
		   	$ionicLoading.hide(); 
        });
		
		
        if(wordlistmain.length!=0){
			for(i=0;i<wordlistmain.length;i++){
				for(j=0;j<wordlistmain[i].wordlist.length;j++){					
					if(wordlistmain[i].wordlist[j].ismaster){					
						masterwordcount++;
					}
					if(wordlistmain[i].wordlist[j].isdifficult){					
						difficultwordcount++;
					}
				}				
			} 
			$scope.total=words.length;			
			$scope.masterwordcount=masterwordcount; 
			$scope.difficultwordcount=difficultwordcount;		 
			$scope.data1 = [
				{
					value: masterwordcount,
					color: "#009933",
					highlight: "#00CC33",
					label: "(M)"
				},
				{
					value: difficultwordcount,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "(D)"
				},
				{
					value: (words.length-(masterwordcount+difficultwordcount)),
					color:"#3399FF",
					highlight: "#33CCFF",
					label: "New"
				}
			]
		
		}
		else{
		
			$scope.total=words.length;			
			$scope.masterwordcount=0; 
			$scope.difficultwordcount=0;		
			$scope.data1 = [
				{
					value: 0,
					color: "#009933",
					highlight: "#00CC33",
					label: "(M)"
				},
				{
					value: 0,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "(D)"
				},
				{
					value: words.length,
					color:"#3399FF",
					highlight: "#33CCFF",
					label: "New"
				}
			]			
		}
  });
	app.controller('resultctrl', function($scope,$stateParams) {
    var count=25;
	var rightans=parseInt($stateParams.resultobj);
	$scope.rightans=rightans;
	$scope.test=selectedtest;
	$scope.retainvalueobj=retainvalue;
    var wrongans=count-rightans;
	$scope.wrongans=wrongans;
	$scope.data1 = [
    {
        value: rightans,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Right"
    },
    {
        value: wrongans,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Wrong"
    }
	]
});  
	app.controller('resultctrl1', function($scope,$stateParams) {
    var count=10;
	$scope.rightans=parseInt($stateParams.resultobj);;
	$scope.test=selectedtest;
	$scope.retainvalueobj=retainvalue;
    $scope.wrongans=count-$scope.rightans;
	$scope.data1 = [
    {
        value: $scope.rightans,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Right"
    },
    {
        value: $scope.wrongans,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Wrong"
    }
]
});  
 	app.controller('loadtestctrl', function($scope,$stateParams,$ionicPopup,$location,$timeout,$cordovaSQLite) { 
	$timeout.cancel(mytimeout);	 
    var questionobject=null;
    var index=0;
	retainvalue=[];
	var tempflag=null;
	var i=0;
    result=0;
	$scope.questionno=1;
    $scope.selectedvalue=null;
	$scope.flag=false;
    $scope.testtitle=$stateParams.id;
	$scope.temp=null;
	$scope.resultobject=0;
    mytimeout = null;

	$scope.counter = 1500;	
	$scope.onTimeout = function() {
        if($scope.counter == 0) {
		  popupcode1();
		    return;
        }
		
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
	function shuffleArray(words) {
			  var m = words.length, t, i;
			  // While there remain elements to shuffle
			  while (m) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);
				// And swap it with the current element.
				t = words[m];
				words[m] = words[i];
				words[i] = t;
			  }         
			  return words;
			}

    mytimeout = $timeout($scope.onTimeout, 1000);
	for(i=0;i<temp.length;i++)
	{	
   		if(temp[i].title==$stateParams.id)
		{			
			questionobject=temp[i];
			selectedtest=temp[i];
			$scope.testanalysis=selectedtest;
			shuffleArray(questionobject.question);
			break;
		}
	}
    $scope.questiontitle=questionobject.question[index].questiontitle;
	$scope.questionoptions=questionobject.question[index].options;
	$scope.loadnextquestion=function(){		
		tempflag=false;
		if(questionobject.question[index+1]){
		$scope.questiontitle=questionobject.question[index+1].questiontitle;
	    $scope.questionoptions=questionobject.question[index+1].options;
			if(index==questionobject.question.length-2)
			{			
				$scope.flag=true;
			}
			$scope.questionno++;
			index++;
		
		}
		$scope.temp=retainvalue[index];
	}
	$scope.loadpreviousquestion=function(){
		tempflag=false;
	   
		if(questionobject.question[index-1]){
			$scope.flag=false;
		$scope.questiontitle=questionobject.question[index-1].questiontitle;
	    $scope.questionoptions=questionobject.question[index-1].options;
		$scope.questionno--;
		index--;			
		}
		$scope.temp=retainvalue[index];
	
	}	
	$scope.loadquestion=function(qindex){
		$scope.questiontitle=questionobject.question[qindex].questiontitle;
	    $scope.questionoptions=questionobject.question[qindex].options;
		$scope.temp=retainvalue[qindex];
		$scope.questionno=qindex+1;
		if(qindex==24)
		{
			$scope.flag=true;
		}
		else 
		$scope.flag=false;
		index=qindex;
	};	
	$scope.retianradiovalue=function(value){
		retainvalue[index]=value;
		$scope.temp=value;
	    if(questionobject.question[index].answer[0]==value)
		{
		   result+=1;
		   tempflag=true;
	    }
		else
		{
			if(tempflag){
			    result-=1;
				tempflag=false;
			}
		}		
		$scope.resultobject=result;	
		temp[i].completed=	result;		
	}
	$scope.showConfirm = function() {
      popupcode();
   };    
	$scope.ExitTest=function(){
	  popupcode();
   }
	function popupcode(){  
	   
	   var confirmPopup = $ionicPopup.confirm({
       title: 'Submit Test',
       template: 'Are you sure you want to finish test?'
     });
	 
     confirmPopup.then(function(res) {
       if(res) {	
           $timeout.cancel(mytimeout);	
			var str=JSON.stringify(temp);  	
			var query="UPDATE data SET questionset=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                       //console.log(temp);
					}, function (err) {
						console.error(err);
			});	         		   		   
		   $location.path('/tab/result/'+result);
        } else {
     }
     }); 
   }
    function popupcode1(){
         var alertPopup = $ionicPopup.alert({
		   title: 'Time Out!'
		  
		 });
		 alertPopup.then(function(res) {
		    $timeout.cancel(mytimeout);	
			var str=JSON.stringify(temp);  	
			var query="UPDATE data SET questionset=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                       //console.log(temp);
					}, function (err) {
						console.error(err);
			});	         		   		   
		   $location.path('/tab/result/'+result);
		 });	   
	}   
  });
	app.controller('testctrl', function($scope,$ionicLoading,$cordovaSQLite,$state) {
       $ionicLoading.show();
	    var query = "SELECT questionset FROM data";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {                
				$scope.questions=JSON.parse(res.rows.item(0).questionset);
				$ionicLoading.hide();				
            } else {              
            }
        }, function (err) {
            console.error(err);
        });	
		$scope.back=function(){		
			$state.go('tabs.home');
		}				

  });
	app.controller('testlistSentenceCtrl', function($scope,$ionicLoading,$cordovaSQLite,$state) {
	  $ionicLoading.show();	
	   var query = "SELECT questionset FROM data1";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {                
				$scope.questions=JSON.parse(res.rows.item(0).questionset);
			    $ionicLoading.hide();
            } else {              
            }
        }, function (err) {
			$ionicLoading.hide();
            console.error(err);
        });
		$scope.back=function(){		
			$state.go('tabs.home');		
		}				
	});
    app.controller('loadStestctrl', function($scope,$stateParams,$ionicPopup,$location,$timeout,$cordovaSQLite) {
 	var questionobject=null;
    var index=0;
	var i=0;
    result=0;
    $scope.questionno=1;
    $scope.selectedvalue=null;
	$scope.flag=false;
    $scope.testtitle=$stateParams.id;
    testcorrect=[];
    mytimeout = null;
    $scope.counter = 600;	
	$scope.onTimeout = function() {
        if($scope.counter == 0) {
			popupcode1();
		    return;
        }		
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };	
    mytimeout = $timeout($scope.onTimeout, 1000);
  
	for(i=0;i<temp1.length;i++)
	{	
   		if(temp1[i].title==$stateParams.id)
		{			
			for(j=0;j<temp1[i].question.length;j++)
			{
				for(k=0;k<temp1[i].question[j].options.length;k++){
					temp1[i].question[j].options[k].check=false;
				}
			}
			questionobject=temp1[i];
		
			$scope.testanalysis=temp1[i];
			break;
		}
	}

    $scope.questiontitle=questionobject.question[index].questiontitle;
	$scope.questionoptions=questionobject.question[index].options;
	$scope.loadnextquestion=function(){
		
		if(questionobject.question[index+1]){
		$scope.questiontitle=questionobject.question[index+1].questiontitle;
	    $scope.questionoptions=questionobject.question[index+1].options;
			if(index==questionobject.question.length-2)
			{			
				$scope.flag=true;
			}
			index++;
             $scope.questionno++;
		}
	}
	$scope.loadpreviousquestion=function(){
		
		if(questionobject.question[index-1]){
			$scope.flag=false;
		$scope.questiontitle=questionobject.question[index-1].questiontitle;
	    $scope.questionoptions=questionobject.question[index-1].options;
		index--;
         $scope.questionno--;
		}
	}	
	$scope.loadquestion=function(qindex){
		$scope.questiontitle=questionobject.question[qindex].questiontitle;
	    $scope.questionoptions=questionobject.question[qindex].options;
		$scope.temp=retainvalue[qindex];
         $scope.questionno=qindex+1;
		if(qindex==9)
		{
			$scope.flag=true;
		}
		else 
			 $scope.flag=false;
		index=qindex;
	};
	$scope.showConfirm = function() {
		popupcode();
   };
   
   $scope.ExitTest=function(){
		popupcode();
   }    
   function calresult(){	   
	for(j=0;j<temp1[i].question.length;j++)
	{
		var resultflag=0;
		for(k=0;k<temp1[i].question[j].options.length;k++){
		if(temp1[i].question[j].options[k].check)
		{						
				if(temp1[i].question[j].options[k].value==temp1[i].question[j].answer[0] || temp1[i].question[j].options[k].value==temp1[i].question[j].answer[1])
				{
							resultflag++;
				}
		}
		}
		if(resultflag==2)
		{
			result++;
			testcorrect[j]=true;
		}	
		else{
			testcorrect[j]=false;
		}		
	}	  
   }
   function popupcode(){	   
	   var confirmPopup = $ionicPopup.confirm({
       title: 'Submit Test',
       template: 'Are you sure you want to finish test?'
     });
     confirmPopup.then(function(res) {
       if(res) {	
           $timeout.cancel(mytimeout);	
		       		 		   
		    selectedtest=temp1[i];
		    calresult();
		    temp1[i].completed=result;
		   	var str=JSON.stringify(temp1); 
					
			var query="UPDATE data1 SET questionset=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {
                     
					}, function (err) {
						console.error(err);
			});
				
       	   $location.path('/tab/sresult/'+result);
        } else {
     }
     });	   
   }
      function popupcode1(){
         var alertPopup = $ionicPopup.alert({
		   title: 'Time Out!'
		  
		 });
		 alertPopup.then(function(res) {
		   $timeout.cancel(mytimeout);	
			         		 		   
		    selectedtest=temp1[i];
		    calresult();
		    temp1[i].completed=result;
		   	var str=JSON.stringify(temp1);  	
			var query="UPDATE data1 SET questionset=(?);"
			$cordovaSQLite.execute(db, query, [str]).then(function(res) {                     
					}, function (err) {
						console.error(err);
			});	         		   
       	   $location.path('/tab/sresult/'+result);
		 });	   
   }  
   
  });
  
   
  
  
  
  
    
  
  	
	
	

  
  
