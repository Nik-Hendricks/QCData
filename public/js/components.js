class InputCheckbox extends HTMLElement{
  constructor(){
    super();
      this.innerHTML = `<label class="container"><input type="checkbox"><span class="checkmark"></span></label>`;
  }
  
  connectedCallback(){
    var scope = this;

      //this.checked = (this.hasAttribute('checked')) ? false : true;
    this.onclick = () => {
      $("input").prop("checked",$(this).prop("checked"));
    }
  }
}






class DropdownSelector extends HTMLElement{

  constructor(){
    super();
    this.value = []
    this.uniqid = Date.now();
    this.setAttribute('uniqid', this.uniqid);
  }


  connectedCallback(){

      //if items attribute = model and has attribute model
      if(this.getAttribute('items') == 'model' && this.hasAttribute('model')){
        //get document from database 
        API.getDocument(this.getAttribute('model')).then(doc => {
          this.items = doc;
        })

      }else{
        this.items = JSON.parse(this.getAttribute('items'))
      }

    this.innerHTML = `
      <div class="dropdown-selector-container">
        <button>Test</button>
        <input type="text" placeholder="search"/>
        <div class="selector-items-container">
        </div>
      </div>
    `

    $(this).find("button").click((ev) => {
      this.fire(ev);
    })
  }


  click(id){
    var selectedElements = this.querySelectorAll(`.selected`)

    var values = []
    selectedElements.forEach(item => {
      values.push(item.getAttribute('uniqid'))
    })
    this.value = values;
    this.setAttribute('value', this.value)
  }

  checkItemSelected(id){
    console.log(id)
      var selectedAttr = String(this.getAttribute('value')).split(',');
      var retval = false;
      if(selectedAttr != ["null"]){
        for(var i = 0; i < selectedAttr.length; i++){
          var selattr = String(selectedAttr[i])
          if(this.uniqid+ selattr == `${id}`){
            retval = true
          }
        }
      }
      return retval;
  }

  fire(ev){
    $(this).find(".selector-items-container").empty();
    for(var i = 0; i < Object.size(this.items); i++){ 

      var btnid = `${this.items[i]._id}`
      var btnuniqid = `${this.uniqid}${btnid}`

      //notice btnid is the acual unmodified id we are getting from the object
      //btnuniqid is the btnid combined with the uniqid
      //we use the btnuniqid to check if the item is selected or not by 
      //adding the uniqid to the front the the btn id and running agains the uniqid
      $(this).find(".selector-items-container").append(`<div uniqid="${btnid}" id="${btnuniqid}"><p>${this.items[i].name}</p></div>`)
      if(this.checkItemSelected(btnuniqid)){
        $(`#${btnuniqid}`).toggleClass('selected')
      }

      
      $(`#${btnuniqid}`).click((ev) => {
        $(ev.currentTarget).toggleClass('selected')
        this.click(ev.target.parentElement.id)
      })

    }
    $(this).toggleClass('opened')
    
  }


}

class DropdownView extends HTMLElement{
  constructor(){
    super();
  }

  connectedCallback(){
    console.log(this.getAttribute('html'))
    API.getView(this.getAttribute('html')).then((data) => {
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

    for (var key of Object.keys(sidebarItems)) {
      var item = sidebarItems[key];
      $("#sidebar-items-container").append(`<div id="${item.id}" onclick="${item.onclick}" class="sidebar-item"><i class="${item.icon}"></i><p>${item.title}</p></div>`)
    }
  }

}


class DataFormControl extends HTMLElement{
    constructor(){
        super();
        API.getHTML('dataFormControl.html').then(html => {
            this.innerHTML = html
        }).then(() => {
            this.dataForm = this.getAttribute('form')
            API.getForm(this.dataForm).then(form => {
                $("#data-form-control-body").append(form)
            })
        })
    }
}



class DataViewTable extends HTMLElement{
  constructor(){
    super();
    API.getHTML("dataViewTable.html").then(html => {
      this.innerHTML = html;
    }).then(() => {
      this.model = this.getAttribute('model');
      var tableh = document.getElementById("data-view-table-thead");
      var tableb = document.getElementById("data-view-table-tbody");
      prepareTable(tableh, tableb, this.model);
    })
  }
}

class DataInputTable extends HTMLElement{
    constructor(){
        super();
        
        API.getHTML('dataInputTable.html').then(html => {
            this.innerHTML = html
        }).then(() => {
            this.model = this.getAttribute('model');
            console.log(this.model);
            
            fetch('http://104.236.0.12/modelFeilds/' + this.model)
            .then(response => response.json())
            .then((data) => {

                for(var key in data){
                    var dataType = data[key].instance;
                    var dataTypeKey = (typeof dataType === 'Array' && dataType !== null? dataType: "Select");
                    var feildName = data[key].path;

                    var dataTypeInputs = {
                        Number: `<input id="${data[key].path}"type='text' placeholder='Number'/>`,
                        String: `<input id="${data[key].path}"type='text' placeholder='String'/>`,
                        Boolean:`<label class="container"><input id="${data[key].path}"type="checkbox"><span class="checkmark"></span></label>`,
                        Date: `<input id="${data[key].path}"type="date" id="start" name="trip-start" value="2021-05-26" min="2018-01-01" max="2099-12-31">`,
                        Array: `<dropdown-selector id="${data[key].path}" items="model" model="robotModel"></dropdown-selector>`,
                        ObjectID: `<input id="${data[key].path}"type='text'  placeholder='ObjectId'/>`,
                        Mixed: `<input id="${data[key].path}"type='text'  placeholder='Object'/>`
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
                console.log(PM._create_new_product)
                PM._create_new_product(recordData)
              });
            })

        })

    }
}





function show_xlsx_sheets(uid){
  console.log(uid)
  setCookie('current_prod_uid', uid)
  VM.clearMainContentContainer();

  console.log(sheet_map)

  var html = `<div id="blue-book-xlsx-list-container"><dl></dl></div>`;

  $('#main-content-container').append(html);

  for(var key in sheet_map){
    $('#blue-book-xlsx-list-container').find("dl").append(`<dt>${key}</dt>`)
    for(var key2 in sheet_map[key]){
      var ppap = key;
      var sheet = key2;
      var prod_uid = getCookie('current_prod_uid')
      $('#blue-book-xlsx-list-container').find("dl").find("dt").append(`<dd onclick="open_xlsx_sheet('${uid}','${sheet}','${ppap}')">${key2}</dd>`)
    }
  }
}

function open_xlsx_sheet(uid, sheet, ppap){
  VM.setView("spreadsheet", {sheet_name: sheet, _ppap:ppap})
}

function prepareTable(tableh, tableb, model){
  var rowDataTypes = [];
  var rowFeildNames = [];

  API.getSchema(model).then(schema => {
    API.getDocument(model).then(docs => {
      var t_row = tableh.insertRow(-1);

      for(var i in schema){
          var cell = t_row.insertCell(0)
          var collumnDataType = schema[i].instance;
          var collumnFeildName = schema[i].path
          cell.innerHTML = `<b>${schema[i].path}</b>`
          rowDataTypes.push(collumnDataType)
          rowFeildNames.push(collumnFeildName);
      }

      var ri = 0;
      for(var i in docs){
        //make row
        var row = tableb.insertRow(-1);
        for(var j in rowDataTypes){

        if(j == Date){
          var dateval = docs[i][rowFeildNames[j]]
          console.log(dateval.substring(0, 9))
        }

        var dataTypeInputs = {
          Number: `<input id="${rowFeildNames[j]}${ri}" value="${docs[i][rowFeildNames[j]]}" type='text' placeholder='Number'/>`,
          String: `<input id="${rowFeildNames[j]}${ri} " value="${docs[i][rowFeildNames[j]]}"type='text' placeholder='String'/>`,
          Boolean: `<input-checkbox ></input-checkbox>`,
          Date: `<input id="${rowFeildNames[j]}${ri}" value="${dateval}"type="date" id="start" name="trip-start" value="2021-05-26" min="2018-01-01" max="2099-12-31">`,
          Array: `<dropdown-selector id="${rowFeildNames[j]}${ri}" items="model" model="moldModel"></dropdown-selector>`,
          ObjectID: `<input id="${rowFeildNames[j]}${ri}" value="${docs[i][rowFeildNames[j]]}"type='text'  placeholder='ObjectId'/>`,
          Object: `<input id="${rowFeildNames[j]}${ri}" value="${docs[i][rowFeildNames[j]]}"type='text'  placeholder='Object'/>`
        }
          //make cell
          var cell = row.insertCell(0)
          cell.innerHTML = dataTypeInputs[rowDataTypes[j]]
        }
        ri++
      }
    })
  })
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

window.customElements.define('dropdown-selector', DropdownSelector);
window.customElements.define("dropdown-view", DropdownView);
window.customElements.define('custom-sidebar', Sidebar);
window.customElements.define('input-checkbox', InputCheckbox)
window.customElements.define('data-view-table', DataViewTable);
window.customElements.define("data-table", DataInputTable)
window.customElements.define("data-form-control", DataFormControl);
