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


$(document).ready(function(){
    populateSidebar();
})


function populateSidebar(){
    console.log(sidebarItems)
    for (var key of Object.keys(sidebarItems)) {
        item = sidebarItems[key];
        console.log(sidebarItems[key].title)
        $("#sidebar-container").append(`<div id="${item.id}" onclick="${item.onclick}" class="sidebar-item"><i class="${item.icon}"></i><p>${item.title}</p></div>`)
    
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

function dataView(){
    $.get( "/view/home.html", function( data ) {
        clearMainContentContainer()
        $("#main-content-container").append(data);
    });
}

function clearMainContentContainer(){
    $('#main-content-container').empty();
}