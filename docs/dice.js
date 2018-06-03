window.onload = function(){
  const url = location.search.substring(1).split('&');
  if(url.length>1){
    document.title = '';
    let tmp;
    for(let i=0; url[i]; i++) {
      tmp = url[i].split('=');
      drawing(tmp[0].slice(1), decodeURIComponent(tmp[1]));
    }
  }else{
    return;
  }
}


function diceroll(){
  document.title = '';
  document.getElementById('dice').textContent = '';
  let nations = ["イギリス", "フランス", "イタリア", "ドイツ",
                  "スカンジナビア", "ソ連", "トルコ"];
  let random;
  let query = {};
  for(let i=0; i<4; i++){
    random = nations[Math.floor(Math.random() * nations.length)];
    drawing(i+1, random);
    query["p"+(i+1)] = random;
    nations = nations.filter(n => n !== random);
  }
  window.history.pushState(
    null, 
    null, 
    location.pathname + '?' + $.param(query));  
}


function drawing(player, nation){
  document.getElementById("dice").insertAdjacentHTML(
    'beforeend', 
    "<p>プレイヤー"+player+"："+nation+"</p>"
  );
  document.title += "p"+player+":"+nation+"　";
}


function lineShare(){
  window.open(
    "https://line.me/R/msg/text/?"+document.title+'%0D%0A'+encodeURI(location.href),
    '_blank'
  );
}