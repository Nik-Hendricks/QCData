var sidebarItems = {
    home:{
        title: "Home",
        icon: 'fas fa-home',
        id: 'home-item',
        onclick: "homeView()"
    },
    forms:{
        title: "Forms",
        icon: 'fas fa-file-alt',
        id:"your-songs-item",
        onclick:"formsView()"
    },
    data:{
        title: "Data",
        icon: 'fas fa-database',
        id:"playlist-item",
        onclick: "dataView()",
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
    populateSidebar();
})

function open_db_document(model){
    console.log(model)
    fetch('http://104.236.0.12/db/document/' + model)
    .then(response => response.json())
    .then((data) => {
        var documentData = data;

        $.get( "/view/dataView.html", ( data ) => {
            clearMainContentContainer()
            $("#main-content-container").append(data);
            document.getElementById("data-view-table").setAttribute('data', JSON.stringify(documentData.data))
        });


    })
}

function populateSidebar(){
    console.log(sidebarItems)
    for (var key of Object.keys(sidebarItems)) {
        item = sidebarItems[key];
        console.log(sidebarItems[key].title)
        $("#sidebar-items-container").append(`<div id="${item.id}" onclick="${item.onclick}" class="sidebar-item"><i class="${item.icon}"></i><p>${item.title}</p></div>`)
    
    }
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

function clearMainContentContainer(){
    $('#main-content-container').empty();
}




