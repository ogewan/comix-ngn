(function(){
    if(jQuery("title").attr("id")=="cng"){ console.log("%c %c %c comic-ng  v"+ vers_ix.version() +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c ", "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "background:purple");}
    console.log("%c pyoofreader v"+ vers_pr.version() +" for comic-ng %c ", "color:white; background:black", "background:purple");
    var app = angular.module('comicNg',[]);
    
    app.filter('iif', function () {
       return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;/*undefined should evalulate to false*/
       };
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
                    document.getElementById("time").Plength = set.pages.length
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