var caruso = {
    frst: function(){
        $("#myCarousel").carousel(0);
    },
    left: function(){
        $("#myCarousel").carousel("prev");
    },
    rght: function(){
        $("#myCarousel").carousel("next");
    },
    last: function(){
        $("#myCarousel").carousel(document.getElementById("time").Plength-1);
    },
    rand: function(){
        $("#myCarousel").carousel(Math.floor(Math.random() * document.getElementById("time").Plength));
    },
    indx: function(val){
        if(event.keyCode == 13) {
            $("#myCarousel").carousel(Math.max(0, Math.min(parseInt(val.value-1), document.getElementById("time").Plength-1)));
        }
    },
};