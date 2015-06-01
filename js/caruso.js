var caruso = {
    frst: function(){
        jQuery("#myCarousel").carousel(0);
    },
    left: function(){
        jQuery("#myCarousel").carousel("prev");
    },
    rght: function(){
        jQuery("#myCarousel").carousel("next");
    },
    last: function(){
        jQuery("#myCarousel").carousel(document.getElementById("time").Plength-1);
    },
    rand: function(){
        jQuery("#myCarousel").carousel(Math.floor(Math.random() * document.getElementById("time").Plength));
    },
    indx: function(val){
        if(event.keyCode == 13) {
            jQuery("#myCarousel").carousel(Math.max(0, Math.min(parseInt(val.value-1), document.getElementById("time").Plength-1)));
        }
    },
};

var controlshow = function(){
    console.log(jQuery(".active").attr("id"));
    console.log(jQuery(".active").hasClass("first"));
    console.log(jQuery(".active").hasClass("last"));
    if(jQuery(".active").hasClass("first")){jQuery(".frs").hide();}
    else{jQuery(".frs").show();}
    if(jQuery(".active").hasClass("last")){jQuery(".las").hide();}
    else{jQuery(".las").show();}
};

var preloadctrl = function(){
    var iid;
    var id = jQuery(".active").attr("id");
    jQuery('[btog=1]').attr("src", ""); /*turn off all active img*/
    for (i = 0; i < jQuery("#myCarousel").attr("pstload"); i++) {
        iid = "#ig"+(parseInt(id)+i).toString;
        jQuery(iid).attr("src", jQuery(iid).attr("isrc")); /*turns image on*/
        jQuery(iid).attr("btog", 1);
    }
    /*jQuery(imgid).attr("src", "");*/ /*turns image off*/
};

jQuery( document ).ready(function() {
    jQuery("#myCarousel").on('slid.bs.carousel',function(e){
         controlshow();
    });
    jQuery(".frs").hide();/*Manually assume first page is first, will be wrong when reload to specific page*/
    jQuery( document ).keydown(function(e) {
        if(jQuery("#snum").is(":focus")){
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