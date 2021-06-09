class ItemSet{
    constructor(props){
        this.items = props.items || [];
    }

    getItems(){
        return this.items;
    }
}

class ItemView extends HTMLElement{
    constructor(){
        super();
        var scope = this;
        this.itemMap = {dataViewItems, dataInputItems, newFormItems, blueBookItems1, blueBookPreProductionItems, blueBookPostProductionItems, blueBookInProductionItems}

        API.getHTML('itemView.html').then(html => {
            this.innerHTML = html;
        }).then(() => {
          if(this.getAttribute('item-set') == 'model' && this.hasAttribute('model')){
            API.getDocument(this.getAttribute('model')).then(doc => {
              this.items = doc;
            }).then(() => {
              this.items.forEach(item => {
                var onclick = `show_xlsx_sheets('${item._id}')`;
                var icon = 'data[key].icon';
                var title = item.name;
                this.appendItem(onclick, title,'fas fa-file')
              });
            })
        }else{
          var data = this.itemMap[this.getAttribute('item-set')];
          this.loadData(data)
        }
      })
    }

  appendItem(onclick, title, icon){
    $(this).find("#item-view-body").append(`
      <div class="item-view-item" onclick="${onclick}">
        <i class="${icon}"></i>
        <p>${title}</p>
      </div>
    `)
  }

  loadData(data){
    for(var key in data){
      var onclick = data[key].onclick;
      var icon = data[key].icon;
      var title = data[key].title;

      $(this).find("#item-view-body").append(`
      <div class="item-view-item" onclick="${onclick}">
        <i class="${icon}"></i>
        <p>${title}</p>
      </div>
      `)
    }
  }
}

window.customElements.define('item-view', ItemView)