
/*
 * Main script for dynamic test Page
 *
 * 2015-10-12
 *
 * By John Darwin Morales
 * Public Domain.
 * Define all dinamic components with the Controllers and Components Javascript 
 */

/*Create Element  menu item float*/
function item_float($scope){
    var label=isDefined($scope.label)?$scope.label:"title";
    var urlLabel=isDefined($scope.url)?$scope.url:"#";
    
    this.element=document.createElement('div');//define the main element
    this.element.setAttribute("class","item-float");
    
    var link=document.createElement('a'); // create the link tag
        link.setAttribute("href",urlLabel);
        link.innerHTML=label;
    
    this.element.appendChild(link);

    this.getElement=function(){
        return this.element;
    }
}

/* Create the Element menu_item*/
function menu_item($scope,$parentscope){
    var items=[];
    var idItem=isDefined($scope.id)?$scope.id:"";
    var label=isDefined($scope.label)?$scope.label:"title";
    var urlLabel=isDefined($scope.url)?$scope.url:"#";
    var itemsFloat=isDefined($scope.items)?$scope.items:[];

    this.$id=idItem;
    this.visible=false;
    this.element=document.createElement('div'); //define the main element
    this.element.setAttribute("class","menu-item col");
    
    
    var head=document.createElement('div');
    head.setAttribute("class","head");
    //this.head.setAttribute("id",idItem);
    
    var caret=document.createElement('div');
    caret.setAttribute("class","caret-icon");
    
    
    var link=document.createElement('a');
    link.innerHTML=label;
    link.setAttribute("href",urlLabel);
    
    var title=document.createElement('div');
    title.setAttribute("class","title");
    title.appendChild(link);
    
    
    head.appendChild(title);
    
    
    
    var menuFloat=document.createElement('div');
    menuFloat.setAttribute("class","menu-float");
    
    
    
   /*add all deep child elements*/
   this.render=function(){
        if(itemsFloat.length>0){
            link.setAttribute("href","#");
            head.appendChild(caret);
            
            for(k in itemsFloat){ 
                var item=itemsFloat[k];
                item.id="$"+idItem+k;
                var elementFloat=new item_float(item);
                //console.log(elementFloat.getElement());
                menuFloat.appendChild(elementFloat.getElement());
            }
        }
        
        this.element.appendChild(head);
        this.element.appendChild(menuFloat);
    }
    
    
    this.getTemplate=function(){
        this.render();
        return this.element;
    }
    
    this.getScope=function(){
        return this;
    }
    
    
   this.element.onclick=function(e){
       $parentscope.currentElement=idItem;
    }
    
    this.changeState=function(state){
        this.visible=state;
        if(state){
            this.element.classList.add("active");
            this.visible=true;
        }else{
            this.element.classList.remove("active");
            this.visible=false;
        }
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

/*This use the JSON service for load the */
function nav_menu(menu_JSON){
    this.items=[];
    this.currentElement="$";
    
    var menu=menu_JSON.items;
    var nav=document.getElementById('nav');
    
    for(k in menu){ 
        var item=menu[k];
        item.id="$"+k;
        var itemM= new menu_item(item,this);
        this.items.push(itemM.getScope());
        nav.appendChild(itemM.getTemplate());
    }
}

/*Controller Menu items. Is ready for Accordion Function*/
function controllerMenu(menu_JSON){
    var nav= new nav_menu(menu_JSON);
    
    this.isActiveMenu=false;
    
    var menu_nav=document.getElementById("menu_nav");
    var container=document.getElementById("main_container");
    var menu_icon=document.getElementById("menu_icon");
    var close_icon=document.getElementById("close_icon");

    menu_icon.onclick=function(e){
      isActiveMenu=true;           
    }
    
    close_icon.onclick=function(e){
       isActiveMenu=false;
    }
 
    /*This watch is for change the state to elements in the Nav-Menu*/
    nav.watch('currentElement',function(id,oldVal,newVal){
        items=nav.items;
        
        for(k in items){
            if(newVal==items[k].$id){
                
                if(items[k].visible){
                    items[k].changeState(false);
                }else{
                    items[k].changeState(true);
                }
                
            }else{
              items[k].changeState(false);
            }
        }
    });
    
    this.watch('isActiveMenu',function(id,oldVal,newVal){
        if(newVal){
            menu_nav.classList.add("active");
            container.classList.add("active");
        }else{
            menu_nav.classList.remove("active");
            container.classList.remove("active");
        }
    });
}


function init(){
 loadJSON(function(response) {
    var menu_JSON = JSON.parse(response);
    controllerMenu(menu_JSON);
    },"/resources/data/menu.json");
}


/*
* Start to Add Components
*/
init();

