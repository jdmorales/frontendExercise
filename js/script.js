function isDefined(varD){
   if (typeof varD != 'undefined')
       return true;
       return false;
}

 function loadJSON(callback,urlFile) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET',urlFile, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }


function item_float(){
    
}


function menu_item(configure,idItem){
    var conf=configure;
    
    var label=isDefined(configure.title)?configure.title:"title";
    var urlLabel=isDefined(configure.url)?configure.title:"#";
    var items=isDefined(configure.items)?configure.title:[];
    console.log(configure);
    //var icon=isDefined(configure.icon)?configure.title:"caret-icon";
    /*
    this.menu_item=document.createElement('div').setAttribute("class","menu-item col");
    this.head=document.createElement('div').setAttribute("class","head");
    this.head.setAttribute("id",idItem);
    
    this.caret=document.createElement('div').setAttribute("class","caret-icon");
    
    this.title=document.createElement('div').setAttribute("class","title");
    this.title.innerHTML=title;
    
    
    this.head.appendChild(title);
    this.head.appendChild(caret);
    
    
    this.menuFloat=document.createElement('div').setAttribute("class","menu-float");
    
    foreach(){
        
    }
    
    
    
    
    
    
    
    ' <div class="menu-item col">'
                               <div class="head" id="item-1">
                                     <div class="title">BUSCAR EMPLEO</div>
                                    <div class="caret-icon"></div>
                                </div>
                                
                                <div class="menu-float">
                                    <div class="item-float"><a href="#">Categoría</a></div>
                                    <div class="item-float"><a href="#">País</a></div>
                                </div>
    </div>'
    
    return{
    
    }
    */
}


function nav(){
    
  // var items= 
}


function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    //console.log(actual_JSON);
    console.log(actual_JSON);
 },"/resources/data/menu.json");
}


window.onload = function(e){ 
    init();
}