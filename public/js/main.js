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
    createForm:{
        title: "Create Form",
        icon: "fas fa-file",
        id: "createForm-item",
        onclick: "createFormView()"
    },
    blueBook:{
        title: "blueBook",
        icon: "fas fa-file",
        id: "createForm-item",
        onclick: "blueBookView()"
    }
}

const blueBookItems1 = {
    SetUp:{
        title: "Pre Production",
        icon: 'fas fa-home',
        id: 'home-item',
        onclick: "blueBookPreProductionView()"
    },
    overview:{
        title: "Production",
        icon: "fas fa-eye",
        id: "overview-item",
        onclick: "blueBookInProductionView()"
    },
    forms:{
        title: "Post Production",
        icon: 'fas fa-file-alt',
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
    //fetch('http://104.236.0.12/db/document/' + model)
    //.then(response => response.json())
    //.then((data) => {
    //    var documentData = data;

    //    $.get( "/view/dataView.html", ( data ) => {
    //        clearMainContentContainer()
    //        $("#main-content-container").append(data);
    //        document.getElementById("data-view-table").setAttribute('data', JSON.stringify(documentData.data))
    //    });
 

    //})
}




function homeView(){
    $.get( "/view/home.html", function( data ) {
        clearMainContentContainer()
        $("#main-content-container").append(data);
    });
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

function createFormView(){
    $.get("/view/createForm.html", (data) => {
        clearMainContentContainer();
        $("#main-content-container").append(data);
    })
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