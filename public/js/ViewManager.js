class ViewManager{
    constructor(elem){
        this.elem = elem;
        this.view_history = [];
        this.view_history_cursor = -1;
        this.views = [];
    }

    pushView(name, html, data){
        this.views[name] = ({html: html, data: data})
    }

    navBack(){
        console.log(this.view_history_cursor)
        if(this.view_history_cursor > 0){
            //delete this.view_history[this.view_history_cursor]
            this.view_history_cursor--
            this._display_history_from_cursor();
        }
    }

    navForward(){
        if(this.view_history_cursor < this.view_history.length){
            this.view_history_cursor++
            this._display_history_from_cursor();
        }
    }

    _display_history_from_cursor(){
        console.log(this.view_history)
        console.log(this.view_history_cursor)

        var view = this.view_history[this.view_history_cursor].name
        var data = this.view_history[this.view_history_cursor].data
        this._display_view(view, data)
    }

    _display_view(name, view_data){
        this.clearMainContentContainer()
        var html = this.views[name].html;
        var parsed = parseTpl(html, view_data);
        $("#main-content-container").append(parsed)
    }

    setView(name, view_data){
        var data;
        if(!this.views[name]){
            this.elem.innerHTML = 'NO VIEW'
        }else{
            if(view_data){
                data = view_data;
            }else{
                data = this.views[name].data
            }
            this._display_view(name, data);
            this.view_history.push({name: name, data: data})
            this.view_history_cursor = this.view_history.length -1;


        }
    }

    clearMainContentContainer(){
        $('#main-content-container').empty();
    }
}

