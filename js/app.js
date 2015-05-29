(function(){
    console.log("%c %c %c comic-ng  v"+ vers_ix.version() +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c ", "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "background:purple");
    var app = angular.module('comicNg',[]);
    
    app.controller('StageDirector', ['$http', '$interval', function($http,$interval){
        var set = this;
        this.now = 0;
        this.promise = $interval(updateTime, 1000);
        this.config = { };
        this.chapters = [ ];
        this.pages = [ ];
        function updateTime() {
            set.now = 
            document.getElementById("time").textContent = Date.now();
            document.getElementById("time").Plength = set.pages.length;
          }
        $http.get('config.json').success(function(data){
            set.config = data.config;
            set.chapters = data.chapters;
            set.pages = data.pages;
        }).error(function(data){
            set.pages = [data];
        });
    }]);
})();