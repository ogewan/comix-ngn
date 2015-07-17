var strButtons = new Array(6);

var btnNews_Lit=new Image;
btnNews_Lit.src="http://www.giantitp.com/Images/redesign/Side_News_Lit.gif";
var btnNews_Unlit=new Image;
btnNews_Unlit.src="http://www.giantitp.com/Images/redesign/Side_News_Unlit.gif";

var btnComics_Lit=new Image;
btnComics_Lit.src="http://www.giantitp.com/Images/redesign/Side_Comics_Lit.gif";
var btnComics_Unlit=new Image;
btnComics_Unlit.src="http://www.giantitp.com/Images/redesign/Side_Comics_Unlit.gif";

var btnStories_Lit=new Image;
btnStories_Lit.src="http://www.giantitp.com/Images/redesign/Side_Stories_Lit.gif";
var btnStories_Unlit=new Image;
btnStories_Unlit.src="http://www.giantitp.com/Images/redesign/Side_Stories_Unlit.gif";

var btnGaming_Lit=new Image;
btnGaming_Lit.src="http://www.giantitp.com/Images/redesign/Side_Gaming_Lit.gif";
var btnGaming_Unlit=new Image;
btnGaming_Unlit.src="http://www.giantitp.com/Images/redesign/Side_Gaming_Unlit.gif";

var btnShop_Lit=new Image;
btnShop_Lit.src="http://www.giantitp.com/Images/redesign/Side_Shop_Lit.gif";
var btnShop_Unlit=new Image;
btnShop_Unlit.src="http://www.giantitp.com/Images/redesign/Side_Shop_Unlit.gif";

var btnForum_Lit=new Image;
btnForum_Lit.src="http://www.giantitp.com/Images/redesign/Side_Forum_Lit.gif";
var btnForum_Unlit=new Image;
btnForum_Unlit.src="http://www.giantitp.com/Images/redesign/Side_Forum_Unlit.gif";

strButtons[0]="News";
strButtons[1]="Comics";
strButtons[2]="Stories";
strButtons[3]="Gaming";
strButtons[4]="Shop";
strButtons[5]="Forum";

function ButtonHover(intButton) {
  document.images[strButtons[intButton]].src = eval("btn" + strButtons[intButton] + "_Lit.src");
}

function ButtonOut(intButton) {
  document.images[strButtons[intButton]].src = eval("btn" + strButtons[intButton] + "_Unlit.src");
}