(function(){
    if(jQuery("title").attr("id")=="cng"){ console.log("%c %c %c comic-ng  v"+ vers_ix.version() +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c ", "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "background:purple");}
    console.log("%c pyoofreader v"+ vers_pr.version() +" for comic-ng %c ", "color:white; background:black", "background:purple");
    var app = angular.module('comicNg',['ngRoute']);
    
    app.filter('iif', function () {
       return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;/*undefined should evalulate to false*/
       };
    });
    
    app.filter('aiif', function () {
       return function(input, trueValue, maybeValue, falseValue) {
            if(input[0]){/*page is permanent?*/
                return trueValue;
            } else {/*undefined should evalulate to false*/
                if(input[2]){/*Is this first page?*/
                    return !input[1] ? maybeValue : falseValue;
                } else {
                    return input[1] ? maybeValue : falseValue;
                }
            }
       };
    });
    
    app.config(function ($routeProvider, $locationProvider) {
        console.log("location"); /*use the HTML5 History API*/
        $locationProvider.html5Mode(true);
    });
    
    app.controller('RouteCtrl', function($scope,$routeParams) {
        $scope.params = $routeParams;
        console.log($routeParams.pagename);
        caruso.jump($routeParams.pagename, 10);
      });
    
    app.directive('stage', function(){
        return {
            restrict: 'E',
            templateUrl: 'stage.html',
            controller: function($http,$interval,$scope,$route, $routeParams, $location){
                $scope.$location = {};
                var set = this;
                this.now = Date.now();
                this.promise = $interval(updateTime, 1000);
                this.config = { };
                this.chapters = [ ];
                this.pages = [ ];
                function updateTime() {
                    set.now = Date.now();
                    vvar1 = set.pages.length;
                    vvar2 = set.config.startpage;
                    /*set.locale = $location.path();*/
                  };
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
    
    app.directive('devset', function(){
        return {
            restrict: 'E',
            templateUrl: 'lscripts.html',
            /*scope: {web: '='},
            link: function($scope, elem, attr){
                if(attr.loc)
            }*/
        };
    });
    app.directive('scriptset', function(){
        return {
            restrict: 'E',
            templateUrl: 'scripts.html',
            /*scope: {web: '='},
            link: function($scope, elem, attr){
                if(attr.loc)
            }*/
        };
    });
})();
