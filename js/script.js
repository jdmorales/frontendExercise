function isDefined(varD){
   if (typeof varD != 'undefined')
       return true;
       return false;
}


/*Used for load .json with an urlFile*/
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


function item_float($scope){
    var label=isDefined($scope.label)?$scope.label:"title";
    var urlLabel=isDefined($scope.url)?$scope.url:"#";
    
    this.item=document.createElement('div');
    this.item.setAttribute("class","item-float");
    this.link=document.createElement('a');
    this.link.setAttribute("href",urlLabel);
    this.link.innerHTML=label;
    

    this.getElement=function(){
        this.item.appendChild(this.link);
        return this.item;
    }
    
}

/* Create the Element menu_item*/
function menu_item($scope){
    var items=[];
    var idItem=isDefined($scope.id)?$scope.id:"";
    var label=isDefined($scope.label)?$scope.label:"title";
    var urlLabel=isDefined($scope.url)?$scope.url:"#";
    var itemsFloat=isDefined($scope.items)?$scope.items:[];
    //console.log(idItem);
    //console.log(label);
    //console.log(urlLabel);
    //console.log(items);
    
    this.itemM=document.createElement('div');
    this.itemM.setAttribute("class","menu-item col");
    
    this.head=document.createElement('div');
    this.head.setAttribute("class","head");
    this.head.setAttribute("id",idItem);
    
    this.caret=document.createElement('div');
    this.caret.setAttribute("class","caret-icon");
    
    this.title=document.createElement('div');
    this.title.setAttribute("class","title");
    this.title.innerHTML=label;
    
    this.head.appendChild(this.title);
    
    
    this.menuFloat=document.createElement('div');
    this.menuFloat.setAttribute("class","menu-float");
    
    
   /*add all deep child elements*/
   this.render=function(){
        if(itemsFloat.length>0){
            this.head.appendChild(this.caret);
            for(k in itemsFloat){ 
                var item=itemsFloat[k];
                item.id="$"+idItem+k;
                var elementFloat=new item_float(item);
                //console.log(elementFloat.getElement());
                this.menuFloat.appendChild(elementFloat.getElement());
            }
        }
        
        this.itemM.appendChild(this.head);
        this.itemM.appendChild(this.menuFloat);
    }
    
    
    this.getTemplate=function(){
        this.render();
        return this.itemM;
    }
    
    
    /*This final template*/
    /* 
        '<div class="menu-item col">'
           <div class="head" id="item-1">
                 <div class="title">BUSCAR EMPLEO</div>
                <div class="caret-icon"></div>
            </div>
            
            <div class="menu-float">
                <div class="item-float"><a href="#">Categoría</a></div>
                <div class="item-float"><a href="#">País</a></div>
            </div>
        </div>'
    */
}


function nav_menu(menu_JSON){
    var menu=menu_JSON.items;
    var nav=document.getElementById('nav');

    var items=[];
  
     for(k in menu){ 
        var item=menu[k];
        item.id="$"+k;
        var itemM= new menu_item(item);
        items.push(itemM.getTemplate());
        nav.appendChild(itemM.getTemplate());
     }
}


function init(){
 loadJSON(function(response) {
    var menu_JSON = JSON.parse(response);
    nav_menu(menu_JSON);
    },"/resources/data/menu.json");
}



init();


//window.onload = function(e){ }