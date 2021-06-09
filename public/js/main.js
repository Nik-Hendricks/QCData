const API = new _API('104.236.0.12')
const PM = new ProductManager();
const VM = new ViewManager($("#main-content-container"));




const sidebarItems = {
    home:{
        title: "Home",
        icon: 'fas fa-home',
        id: 'home-item',
        onclick: "VM.setView('home')"
    },
    overview:{
        title: "Overview",
        icon: "fas fa-eye",
        id: "overview-item",
        onclick: "VM.setView('overview')"
    },
    forms:{
        title: "Forms",
        icon: 'fas fa-file-alt',
        id:"forms-item",
        onclick: "VM.setView('forms')"
    },
    data:{
        title: "Data",
        icon: 'fas fa-database',
        id:"data-item",
        onclick: "VM.setView('data')"
    },
    blueBook:{
        title: "Blue Book",
        icon: "fas fa-file",
        id: "createForm-item",
        onclick: "VM.setView('blue book')"
    }
}

const blueBookItems1 = {
    SetUp:{
        title: "Pre Production",
        icon: 'fas fa-backward',
        id: 'home-item',
        onclick: "blueBookPreProductionView()"
    },
    overview:{
        title: "Production",
        icon: "fas fa-play",
        id: "overview-item",
        onclick: "blueBookInProductionView()"
    },
    forms:{
        title: "Post Production",
        icon: 'fas fa-forward',
        id:"forms-item",
        onclick:"blueBookPostProductionView()"
    },
}

const blueBookPreProductionItems = {
    setUp:{
        title: "Set-up",
        icon: 'fas fa-wrench',
        id: 'home-item',
        onclick: "blueBookPreProductionView()"
    },
    processing:{
        title: "Processing",
        icon: "fas fa-sync",
        id: "overview-item",
        onclick: "blueBookInProductionView()"
    },
    QCDocumentation:{
        title: "QC Documentation",
        icon: 'fas fa-file-alt',
        id:"forms-item",
        onclick:"blueBookPostProductionView()"
    },
    productionDocumentation:{
        title: "Quality Documentation",
        icon: 'far fa-file-alt',
        id:"forms-item",
        onclick:"blueBookPostProductionView()"
    },
}

const blueBookPostProductionItems = {
    SetUp:{
        title: "Pre Production",
        icon: 'fas fa-backward',
        id: 'home-item',
        onclick: "blueBookPreProductionView()"
    },
    overview:{
        title: "Production",
        icon: "fas fa-play",
        id: "overview-item",
        onclick: "blueBookInProductionView()"
    },
    forms:{
        title: "Post Production",
        icon: 'fas fa-forward',
        id:"forms-item",
        onclick:"blueBookPostProductionView()"
    },
}

const blueBookInProductionItems = {
    QCDocumentation:{
        title: "QC Documentation",
        icon: 'fas fa-file-alt',
        id:"forms-item",
        onclick:"blueBookPostProductionView()"
    },
    productionDocumentation:{
        title: "Quality Documentation",
        icon: 'far fa-file-alt',
        id:"forms-item",
        onclick:"blueBookPostProductionView()"
    },
}

var newFormItems = {
    qualitySheet:{
        title: "Quality Sheet",
        icon: 'fas fa-file',
        id:"data-view-item",
        onclick: ""
    },
}

var dataInputItems = {
        robots:{
        title: "New Robot",
        icon: 'fas fa-robot',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'robotModel'})",
    },

    products:{
        title: "New Product",
        icon: 'fas fa-plus-square',
        id:"data-view-item",
        onclick: "VM.setView('data input',{model:'productModel'})",
    },

    productData:{
        title: "New Product Data",
        icon: 'fas fa-plus-square',
        id:"data-view-item",
        onclick: "VM.setView('data input',{model:'productDataModel'})",
    },

    clients:{
        title: "New Client",
        icon: 'fas fa-handshake',
        id:"data-view-item",
        onclick: "VM.setView('data input',{model:'clientModel'})",
    },
    setups:{
        title: "New Setup",
        icon: 'fas fa-wrench',
        id:"data-view-item",
        onclick: "VM.setView('data input',{model:'setupModel'})",
    },
    molds:{
        title: "New Mold",
        icon: 'fas fa-cubes',
        id:"data-view-item",
        onclick: "VM.setView('data input',  {model:'moldModel'})",
    },
}

var dataViewItems = {
    robots:{
        title: "Robots",
        icon: 'fas fa-robot',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'robotModel'})",
    },

    products:{
        title: "Products",
        icon: 'fas fa-plus-square',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'productModel'})",
    },

    productData:{
        title: "Product Data",
        icon: 'fas fa-plus-square',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'productDataModel'})",
    },

    clients:{
        title: "Clients",
        icon: 'fas fa-handshake',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'clientModel'})",
    },
    setups:{
        title: "Setups",
        icon: 'fas fa-wrench',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'setupModel'})",
    },
    molds:{
        title: "Molds",
        icon: 'fas fa-cubes',
        id:"data-view-item",
        onclick: "VM.setView('data view', {model: 'moldModel'})",
    },
}


$(document).ready(function(){
    var _ppap = "PreProduction";
    var sheet_name = "QCDocumentation";
    VM.pushView('spreadsheet','<h1 class="title-h1">Home</h1><spreadsheet-view product_UID="" sheet="${sheet_name}" ppap="${_ppap}"></spreadsheet-view>',{sheet_name: sheet_name, _ppap: _ppap})
    VM.pushView('home','<h1 class="title-h1">Home</h1><spreadsheet-view product_UID="" sheet="${sheet_name}" ppap="${_ppap}"></spreadsheet-view>',{sheet_name: sheet_name, _ppap: _ppap})
    VM.pushView('overview','<h1 class="title-h1">Overview</h1><item-view id="item-view" item-set="dataInputItems"></item-view><item-view id="item-view" item-set="dataViewItems"></item-view>')
    VM.pushView("forms",'<h1 class="title-h1">Forms</h1><item-view id="item-view" item-set="dataInputItems"></item-view>' );
    VM.pushView("data", '<h1 class="title-h1">Data</h1><item-view item-set="dataViewItems" ></item-view>');
    VM.pushView("blue book", '<h1 class="title-h1">Blue Book</h1><item-view id="item-view" item-set="model" model="productModel"></item-view>');
    VM.pushView("data input", '<h1 class="title-h1">New Data</h1><data-table id="data-table" model="${model}"></data-table>', {model:'productModel'});
    VM.pushView("data view", '<data-view-table id="data-view-table" model="${model}"></data-view-table>', {model: 'robotModel'});
    VM.pushView("test view", '<json-editor></json-editor>')
    VM.setView("test view")
    
    //var pm = new ProductManager();
    PM._pushProduct(new ProductItem('60c0127066c3796afdd252cb'))
    console.log(API)
})


const sheet_map = {
  "PreProduction":{
    "Setup":{
      filename:'Set-up.xlsx',
    },
    "QCDocumentation":{
      filename:'QC Documentation.xlsx',
    },
    "ProductionDocumentation":{
      filename:'Production Documentation.xlsx',
    },
    "Processing":{
      filename:'Processing.xlsx',
    }
  },

  "PostProduction":{

  },

  "InProduction":{
    "QualityDocumentation":{
      filename: "Quality Documentation.xlsx"
    },
    "ProductionDocumentation":{
      filename: "Production Documentation.xlsx"
    },
  }
}