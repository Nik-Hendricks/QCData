class JsonEditor extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<div class="json-editor-container"><div contenteditable="true" ></div></div>`
        this._json = {test: "test", otherTest: 'otherTest'}
        
        this.input = $(this).find("div").find('div');
        this.lookup_table = {
            "tab":{
                
            },
            "feild":{

            }
        }
    }

    connectedCallback(){
        for(var key in this._json){
            console.log(key)
            var prev_val = this.input.html();
            //this.input.html(JSON.stringify(this._json, null, "\t"))
            this.input.append(`<input type="text" class="json-input-text"/>`)



        }
    }
}

window.customElements.define('json-editor', JsonEditor);