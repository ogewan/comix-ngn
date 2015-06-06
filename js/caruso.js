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
        jQuery("#myCarousel").carousel(vvar1-1);
    },
    rand: function(){
        jQuery("#myCarousel").carousel(Math.floor(Math.random() * vvar1));
    },
    indx: function(val){
        if(event.keyCode == 13) {
            val = parseInt(val.value);
            if(isNaN(val)) val = 1;//default
            jQuery("#myCarousel").carousel(Math.max(0, Math.min(val-1, vvar1-1)));
        }
    },
    jump: function(val){/*this function is called on page load via routing*/
        val = Math.abs(parseInt(val));
        if(isNaN(val)) val = 1;//default
        jQuery("#myCarousel").carousel(Math.max(0, Math.min(val-1, vvar1-1)));
        //preloadctrl(-val);/*might be called twice*/
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

var preloadctrl = function(val){
    var id;
    val = parseInt(val);
    if(typeof val === "undefined" || isNaN(val)) {
        id = jQuery(".active").attr("id");
    } else {
        id = val;
    }
    var iid;
    jQuery('[btog=1]').attr("src", ""); /*turn off all active img*/
    jQuery('[btog=1]').attr("btog", 0); /*decrement*/
    jQuery('[btog=2]').attr("btog", 1);
    
    if(!vvar2&&id==0||vvar2&&id==vvar1){
        location.hash = '';
    } else if(id<0){
        id=id*-1;
        location.hash = location.hash;
    } else {
        console.log("location hash :"+(parseInt(id)+1).toString());
        location.hash = (parseInt(id)+1).toString();
    }
    /*location.path = jQuery("base").attr("href") + "%23" + id;*/
    /*console.log(jQuery("base").attr("href"));*/
    for (i = 0; i < jQuery("#myCarousel").attr("pstload"); i++) {
        iid = "#ig"+(parseInt(id)+i).toString();
        console.log(iid);
        if(jQuery(iid).attr("btog")==0){
            jQuery(iid).attr("src", jQuery(iid).attr("isrc")); /*turns image on*/
        }
        jQuery(iid).attr("btog", 2);
    }
    for (i = -1; i > (jQuery("#myCarousel").attr("preload")*-1)-2; i--) {
        iid = "#ig"+(parseInt(id)+i).toString();
        console.log(iid);
        if(jQuery(iid).attr("btog")==0){
            jQuery(iid).attr("src", jQuery(iid).attr("isrc")); /*turns image on*/
        }
        jQuery(iid).attr("btog", 2);
    }
};

jQuery( document ).ready(function() {
    jQuery("#myCarousel").on('slid.bs.carousel',function(e){
         controlshow();
    });
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