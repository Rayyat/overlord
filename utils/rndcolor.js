function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

exports.getRandomColor = getRandomColor;
exports.errorlink = "http://cdn.discordapp.com/attachments/478120867034038284/487310827066621963/error.png";
exports.qulink = "http://cdn.discordapp.com/attachments/478120867034038284/487312077069746188/Loja_virtual_ajuda.png"
exports.succlink = "http://cdn.discordapp.com/attachments/463771687595278346/488078895820701696/WHITE_HEAVY_CHECK_MARK.png"
exports.warnlink = "http://cdn.discordapp.com/attachments/463771687595278346/485828561207427073/WARNING_SIGN.png"
function listmodcommand(mc,prefix){
    var lsi = "None.";
       for (let i = 0; i < mc.length; i++) {
         if(i == 0){
             lsi = "`"+prefix+mc[i]+"`";
         }
         else{
             lsi = lsi +"  `"+prefix+mc[i]+"`";
         }
      }
      return lsi;
}
exports.listmodcommand = listmodcommand;
function listarray(mc){
	var lsi = "None.";
	   for (let i = 0; i < mc.length; i++) {
		 if(i == 0){
			 lsi = "`"+mc[i]+"`";
		 }
		 else{
			 lsi = lsi +" ,`"+mc[i]+"`";
		 }
	  }
	  return lsi;
}
exports.listarray = listarray;
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
exports.getRndInteger = getRndInteger;