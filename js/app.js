(function(){
    if(jQuery("title").attr("id")=="cng"){ console.log("%c %c %c comic-ng  v"+ vers_ix.version() +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c ", "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "background:purple");}
    console.log("%c pyoofreader v"+ vers_pr.version() +" for comic-ng %c ", "color:white; background:black", "background:purple");
    var app = angular.module('comicNg',['ngRoute']);
    
    app.filter('iif', function () {
       return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;/*undefined should evalulate to false*/
       };
    });
    
    app.config(function ($routeProvider, $locationProvider) {
        console.log("route");
        $routeProvider
        // set route for the dynamic page
        .when('/:pagename',
        {
            controller: 'RouteCtrl',
            template: " "
        }) // if not match with any route config then send to home page
         .otherwise({
            redirectTo: '/'
          });
        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
    });
    
    app.controller('RouteCtrl', function($scope,$routeParams) {
        // create a message to display in our view 
        console.log($routeParams.pagename);
        caruso.jump($routeParams.pagename, 10);
      });
    
    app.directive('stage', function(){
        return {
            restrict: 'E',
            templateUrl: 'stage.html',
            controller: function($http,$interval,$scope){
                var set = this;
                this.now = Date.now();
                this.promise = $interval(updateTime, 1000);
                this.config = { };
                this.chapters = [ ];
                this.pages = [ ];
                function updateTime() {
                    set.now = Date.now();
                    vvar1 = set.pages.length;
                  }
                $http.get('config.json').success(function(data){
                    set.config = data.config;
                    set.chapters = data.chapters;
                    set.pages = data.pages;
                    /*data.pyr; Is only relevant to pyoofreader*/
                }).error(function(data){
                    set.pages = [data];
                });
            },
            controllerAs: 'scene',
        };
    });
})();
