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

var controlshow = function(){
    console.log($(".active").attr("id"));
    console.log($(".active").hasClass("first"));
    console.log($(".active").hasClass("last"));
    if($(".active").hasClass("first")){$(".frs").hide();}
    else{$(".frs").show();}
    if($(".active").hasClass("last")){$(".las").hide();}
    else{$(".las").show();}
}

$( document ).ready(function() {
    $("#myCarousel").on('slid.bs.carousel',function(e){
         controlshow();
    });
    $(".frs").hide();/*Manually assume first page is first, will be wrong when reload to specific page*/
    $( document ).keydown(function(e) {
        if($("#snum").is(":focus")){
            return;
        }
        if(e.keyCode == 37){
            caruso.left();
        }
        else if(e.keyCode == 39){
            caruso.rght();
        }
    });
});