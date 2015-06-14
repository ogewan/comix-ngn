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
            if(input[3]) return maybeValue; /*system override in progress*/
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
        console.log("route ready");
        $routeProvider.when('/:page', {
            template: function(params,path){
                console.log("Assuming Route Control");
                console.log(params.page);
                console.log(path);
                vvar3 = Math.abs(parseInt(params.page));
                caruso.jump(params.page);
                //return params.page;
            }
        });
        //$locationProvider.html5Mode(true);
    });
    
    app.directive('stage', function(){
        return {
            restrict: 'E',
            templateUrl: 'stage.html',
            controller: function($http,$interval,$scope,$route, $routeParams, $location){
                $scope.$location = {};
                var set = this;
                if(typeof vvar3 == 'undefined') this.over = -1;
                else this.over = vvar3;
                this.OVERRIDE = function(int){
                    return int == set.over-1;
                };
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
                $http.get('script.json').success(function(data){
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
