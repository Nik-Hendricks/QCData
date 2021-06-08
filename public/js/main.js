
const sidebarItems = {
    home:{
        title: "Home",
        icon: 'fas fa-home',
        id: 'home-item',
        onclick: "homeView()"
    },
    overview:{
        title: "Overview",
        icon: "fas fa-eye",
        id: "overview-item",
        onclick: "overviewView()"
    },
    forms:{
        title: "Forms",
        icon: 'fas fa-file-alt',
        id:"forms-item",
        onclick:"formsView()"
    },
    data:{
        title: "Data",
        icon: 'fas fa-database',
        id:"data-item",
        onclick: "dataView()",
    },
    blueBook:{
        title: "Blue Book",
        icon: "fas fa-file",
        id: "createForm-item",
        onclick: "blueBookView()"
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
        onclick: "dataInputTableView('robotModel')",
    },

    products:{
        title: "New Product",
        icon: 'fas fa-plus-square',
        id:"data-view-item",
        onclick: "dataInputTableView('productModel')",
    },

    clients:{
        title: "New Client",
        icon: 'fas fa-handshake',
        id:"data-view-item",
        onclick: "dataInputTableView('clientModel')",
    },
    setups:{
        title: "New Setup",
        icon: 'fas fa-wrench',
        id:"data-view-item",
        onclick: "dataInputTableView('setupModel')",
    },
    molds:{
        title: "New Mold",
        icon: 'fas fa-cubes',
        id:"data-view-item",
        onclick: "dataInputTableView('moldModel')",
    },
}

var dataViewItems = {
    robots:{
        title: "Robots",
        icon: 'fas fa-robot',
        id:"data-view-item",
        onclick: "open_db_document('robotModel')",
    },

    products:{
        title: "Products",
        icon: 'fas fa-plus-square',
        id:"data-view-item",
        onclick: "open_db_document('productModel')",
    },

    clients:{
        title: "Clients",
        icon: 'fas fa-handshake',
        id:"data-view-item",
        onclick: "open_db_document('clientModel')",
    },
    setups:{
        title: "Setups",
        icon: 'fas fa-wrench',
        id:"data-view-item",
        onclick: "open_db_document('setupModel')",
    },
    molds:{
        title: "Molds",
        icon: 'fas fa-cubes',
        id:"data-view-item",
        onclick: "open_db_document('moldModel')",
    },
}


$(document).ready(function(){
    //
})

function open_db_document(model){
    console.log(model)
    $.get( "/view/dataView.html", ( data ) => {
        clearMainContentContainer()
        $("#main-content-container").append(data);
        //document.getElementById("data-view-table").setAttribute('data', JSON.stringify(documentData.data))
        document.getElementById("data-view-table").setAttribute('model', model)
    });
}




function homeView(){
        clearMainContentContainer()

        var _ppap = "PreProduction";
        var sheet_name = "Setup";

        $("#main-content-container").append(`
            <h1 class="title-h1">Home</h1>
            <spreadsheet-view product_UID="" sheet="QCDocumentation" ppap="PreProduction"></spreadsheet-view>
        `);
}

function formsView(){
    $.get( "/view/forms.html", function( data ) {
        clearMainContentContainer()
        $("#main-content-container").append(data);
    });
}

function dataInputTableView(model){
    $.get("/view/dataFormView.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    }).then(() => {
        document.getElementById("data-table").setAttribute("model", model)
    })
}

function dataFormView(form){
    $.get( "/view/dataFormView.html", function( data ) {
        clearMainContentContainer()
        $("#main-content-container").append(data);
    }).then(() => {
        document.getElementById("data-form-control").setAttribute("form", form)
    });
}

function dataView(){
    $.get( "/view/data.html", function( data ) {
        clearMainContentContainer()
        $("#main-content-container").append(data);
    });
}

function blueBookView(){
    $.get("/view/bluebook.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    })
}

function blueBookInProductionView(){
    $.get("/view/bluebook_in_production_view.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    })
}

function blueBookPostProductionView(){
    $.get("/view/bluebook_post_production_view.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    })
}

function blueBookPreProductionView(){
    $.get("/view/bluebook_pre_production_view.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    })
}

function overviewView(){
    $.get("/view/overviewView.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    })
}

function clearMainContentContainer(){
    $('#main-content-container').empty();
}




function getSchema(model){
  return new Promise(resolve => {
    fetch('http://104.236.0.12/modelFeilds/' + model)
      .then(response => response.json())
      .then((data) => {
        resolve(data)
      })
  })
}

function getDocument(model){
    return new Promise(resolve => {
    fetch('http://104.236.0.12/db/document/' + model)
      .then(response => response.json())
      .then((data) => {
        resolve(data.data)
      })
    })
}

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

function prepareLuckyChart(sheet, ppap){
    return new Promise(resolve => {
        getXLSX(sheet, ppap).then(data => {
          //Configuration item
        LuckyExcel.transformExcelToLucky(data, function(exportJson, luckysheetfile){
                luckysheet.destroy();
                var ls = luckysheet.create({
                  container: 'luckysheet', // luckysheet is the container id
                  data:exportJson.sheets,
                  title:exportJson.info.name,
                  allowEdit: true,
                  forceCalculation: false,
                  	hook:{
		                workbookCreateAfter:function(){
	                		resolve(luckysheet)
	                	}
	                }
                })
        })

          
        })
    })
}

function get_row_by_id(db, id){
    return new Promise(resolve => {
        fetch(`http://104.236.0.12/get_row_by_id/${db}/${id}`, {
            method: 'GET',
        }).then(res => res.json())
        .then(json => resolve(json));
    })
}

function getXLSX(sheet, ppap){
    var sheet_name = sheet_map[ppap][sheet].filename
    console.log(sheet_name)
    return new Promise(resolve => {
    fetch(`http://104.236.0.12/xlsx/${ppap}/${sheet_name}`)
      .then(response => response.arrayBuffer())
      .then((data) => {
        resolve(data)
      })
    })
    
}