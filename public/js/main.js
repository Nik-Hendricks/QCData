var sidebarItems = {
    home:{
        title: "Home",
        icon: 'fas fa-home',
        id: 'home-item',
        onclick: "homeView()"
    },
    yourSongs:{
        title: "Data",
        icon: 'fas fa-music',
        id:"your-songs-item",
        onclick:"songsView()"
    },
    playlists:{
        title: "Settings",
        icon: 'fas fa-compact-disc',
        id:"playlist-item",
        onclick: "playlistsView()",
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

