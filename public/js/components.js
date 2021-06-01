class InputCheckbox extends HTMLElement{
  constructor(){
    super();
      this.innerHTML = `<label class="container"><input type="checkbox"><span class="checkmark"></span></label>`;
  }
  
  connectedCallback(){
    var scope = this;
      console.log(this.checked)
      //this.checked = (this.hasAttribute('checked')) ? false : true;
      this.onclick = () => {

      $("input").prop("checked",$(this).prop("checked"));

        
    }
  }

}

class DropdownView extends HTMLElement{
  constructor(){
    super();
  }

  connectedCallback(){
    console.log(this.getAttribute('html'))
    getView(this.getAttribute('html')).then((data) => {
      console.log(data)
      this.innerHTML = data;

      this.onclick = () => {
        console.log('click')
        $(this).toggleClass('expanded')
      }

    })
  }

}

class Sidebar extends HTMLElement{
  constructor(){
    super();
  }

  connectedCallback(){
    this.innerHTML = `
    <div class="sidebar-container" id="sidebar-container">
      <div class="sidebar-logo-container">
      </div>

      <div class="sidebar-items-container" id="sidebar-items-container">
      </div>
    </div>`

    console.log(sidebarItems)
    for (var key of Object.keys(sidebarItems)) {
      var item = sidebarItems[key];
      console.log(sidebarItems[key].title)
      $("#sidebar-items-container").append(`<div id="${item.id}" onclick="${item.onclick}" class="sidebar-item"><i class="${item.icon}"></i><p>${item.title}</p></div>`)
    }
  }

}


class DataFormControl extends HTMLElement{
    constructor(){
        super();
        getHTML('dataFormControl.html').then(html => {
            this.innerHTML = html
        }).then(() => {
            this.dataForm = this.getAttribute('form')
            console.log(this.dataForm)
            getForm(this.dataForm).then(form => {
                $("#data-form-control-body").append(form)
            })
        })
    }
}

class ItemView extends HTMLElement{
    constructor(){
        super();

        this.itemMap = {dataViewItems, dataInputItems}

        getHTML('itemView.html').then(html => {
            this.innerHTML = html;
        }).then(() => {
        console.log(this.getAttribute('item-set'))

        this.items = this.itemMap[this.getAttribute('item-set')];



          var data = this.items
          for(var key in data){

            console.log(data[key])

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

        })
    }


}

class DataViewTable extends HTMLElement{
  constructor(){
    super();

    getHTML("dataViewTable.html").then(html => {
      this.innerHTML = html;
    }).then(() => {
      this.model = this.getAttribute('model');

      console.log(this.model)

      var tableh = document.getElementById("data-view-table-thead");
      var tableb = document.getElementById("data-view-table-tbody");
      prepareTable(tableh, tableb, this.model);




    })

  }
}

class DataInputTable extends HTMLElement{
    constructor(){
        super();
        
        getHTML('dataInputTable.html').then(html => {
            this.innerHTML = html
        }).then(() => {
            this.model = this.getAttribute('model');
            console.log(this.model);
            
            fetch('http://104.236.0.12/modelFeilds/' + this.model)
            .then(response => response.json())
            .then((data) => {
                console.log(data[1])
            

                for(var key in data){
                    console.log(data[key]);
                    var dataType = data[key].instance;
                    console.log(dataType)
                    console.log(dataType['ref'])
                    var dataTypeKey = (typeof dataType === 'Array' && dataType !== null? dataType: "Select");
                    var feildName = data[key].path;

                    var dataTypeInputs = {
                        Number: `<input id="${data[key].path}"type='text' placeholder='Number'/>`,
                        String: `<input id="${data[key].path}"type='text' placeholder='String'/>`,
                        Boolean:`<label class="container"><input id="${data[key].path}"type="checkbox"><span class="checkmark"></span></label>`,
                        Date: `<input id="${data[key].path}"type="date" id="start" name="trip-start" value="2021-05-26" min="2018-01-01" max="2099-12-31">`,
                        Array: `<div class="custom-select" style="width:200px;"><select id="${data[key].path}"><option value="0">Select:</option></select></div>`,
                        ObjectID: `<input id="${data[key].path}"type='text' disabled placeholder='ObjectId'/>`
                    }

                    $("#data-table-table").append(`
                        <tr>
                            <td> <p>${data[key].path}</p></td><td>${dataTypeInputs[dataType]}</td>
                        </tr>
                    `)   
                }
                setupSelect();

              $( "#data-input-table-submit" ).click(() =>{ 
                var recordData = {}

                for(var key in data){
                  var inpt = document.getElementById(key)
                  var va = (inpt.value == ""? undefined : inpt.value);
                  var vb = (va == 0 ? undefined : va)
                  var vc = (vb == 'on'? undefined : vb);
                  recordData[key] = vc
                }
                fetch(`http://104.236.0.12/db/${this.model}/insert`, {
                    method: 'POST',
                    body: JSON.stringify({"data": recordData}),
                    headers: {'Content-Type': 'application/json'}
                }).then(res => res.json())
                  .then(json => console.log(json));
              });
            })

        })

    }
}



function getForm(form){
    return new Promise(resolve => {
        $.get(`/form/${form}`, (data) => {
            resolve(data)
        })
    })
}

function getView(file){
  return new Promise(resolve => {
    $.get(`/view/${file}`, (data) => {
      resolve(data);
    })
  })
}

function getHTML(file){
    return new Promise(resolve =>{
        $.get( `/component/${file}`, function( data ) {
            resolve(data)
        });
    })
}

function prepareTable(tableh, tableb, model){
  console.log(model)


  var rowDataTypes = [];
  var rowFeildNames = [];



  getSchema(model).then(schema => {
    getDocument(model).then(docs => {
      var t_row = tableh.insertRow(-1);

      for(var i in schema){
          var cell = t_row.insertCell(0)
          var collumnDataType = schema[i].instance;
          var collumnFeildName = schema[i].path
          console.log(collumnFeildName)
          cell.innerHTML = `<b>${schema[i].path}</b>`
          rowDataTypes.push(collumnDataType)
          rowFeildNames.push(collumnFeildName);
      }
      var ri = 0;
      for(var i in docs){
        //make row
        var row = tableb.insertRow(-1);
        for(var j in rowDataTypes){
        
        //var checked = (docs[i][rowFeildNames[j]] == undefined? 'checked': docs[i][rowFeildNames[j]])

       //console.log(checked)

        if(j == Date){
          var dateval = docs[i][rowFeildNames[j]]
          console.log(dateval.substring(0, 9))
        }

        var dataTypeInputs = {
          Number: `<input id="${rowFeildNames[j]}${ri}" value="${docs[i][rowFeildNames[j]]}" type='text' placeholder='Number'/>`,
          String: `<input id="${rowFeildNames[j]}${ri} " value="${docs[i][rowFeildNames[j]]}"type='text' placeholder='String'/>`,
          Boolean: `<input-checkbox ></input-checkbox>`,
         // Boolean:`<label class="container"><input id="${rowFeildNames[j]}${ri}" ${checked} type="checkbox"><span class="checkmark"></span></label>`,
          Date: `<input id="${rowFeildNames[j]}${ri}" value="${dateval}"type="date" id="start" name="trip-start" value="2021-05-26" min="2018-01-01" max="2099-12-31">`,
          Array: `<div class="custom-select" style="width:200px;"><select id="${rowFeildNames[j]}${ri}" value="${docs[i][rowFeildNames[j]]}"><option value="0">Select:</option></select></div>`,
          ObjectID: `<input id="${rowFeildNames[j]}${ri}" value="${docs[i][rowFeildNames[j]]}"type='text' disabled placeholder='ObjectId'/>`
        }
          //make cell


          var cell = row.insertCell(0)
          cell.innerHTML = dataTypeInputs[rowDataTypes[j]]
        }
        ri++


      }

    })
  })




   // var table_columns = Object.size(data[0]);
   // var table_rows = Object.size(data);
   // var row = tableh.insertRow(-1)
//
   // for(var key in data[0]){
   //     var cell = row.insertCell(0)
   //     cell.innerHTML = `<b>${key}</b>`
   // }
   // for(var keyA in data){
   //     var newRow = tableb.insertRow(-1)
   //     for(var keyB in data[keyA]){
   //         var record = data[keyA][keyB]
   //         var newCell = newRow.insertCell(0)
   //         newCell.innerHTML = record
   //     }
   // }

}

function setupSelect(){
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);


          
}

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

window.customElements.define("dropdown-view", DropdownView);
window.customElements.define('custom-sidebar', Sidebar);
window.customElements.define('input-checkbox', InputCheckbox)
window.customElements.define('data-view-table', DataViewTable);
window.customElements.define("item-view", ItemView);
window.customElements.define("data-table", DataInputTable)
window.customElements.define("data-form-control", DataFormControl);
