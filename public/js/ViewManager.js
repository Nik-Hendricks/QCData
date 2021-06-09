class ViewManager{
    constructor(elem){
        this.elem = elem;
        this.views = [];
        console.log(this.elem)
    }

    pushView(name, html, data){
        this.views[name] = ({html: html, data: data})
    }

    setView(name, view_data){
        var data;
        this.clearMainContentContainer()
        if(!this.views[name]){
            this.elem.innerHTML = 'NO VIEW'
        }else{
            if(view_data){
                data = view_data;
            }else{
                data = this.views[name].data
            }

            var html = this.views[name].html;
            var parsed = parseTpl(html, data);
            console.log(parsed)
            $("#main-content-container").append(parsed)
        }
    }

    clearMainContentContainer(){
        $('#main-content-container').empty();
    }
}

