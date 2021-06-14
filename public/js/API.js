class _API{
    constructor(ip){
        this.ip = ip;
    }

    getSchema(model){
      return new Promise(resolve => {
      fetch(`http://${this.ip}/modelFeilds/` + model)
        .then(response => response.json())
        .then((data) => {
          resolve(data)
        })
      })
    }

    getDocument(model){
        return new Promise(resolve => {
        fetch(`http://${this.ip}/db/${model}/model`)
          .then(response => response.json())
          .then((data) => {
            resolve(data.data)
          })
        })
    }

    getRowById(db, id){
        return new Promise(resolve => {
            fetch(`http://${this.ip}/db/${db}/row/${id}`, {
                method: 'GET',
            }).then(res => res.json())
            .then(json => resolve(json));
        })        
    }

    setRowByID(db, id, row){
        return new Promise(resolve => {
            fetch(`http://${this.ip}/db/${db}/${id}`, {
                method: 'POST',
                data: row,
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then(json => resolve(json));
        })       
    }



    insertDocument(model, data){
      return new Promise(resolve => {
        fetch(`http://${this.ip}/db/${model}/insert`, {
            method: 'POST',
            body: JSON.stringify({"data": data}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
          .then(json => resolve(json));
      })
    }

  getXLSX(sheet, ppap){
      var sheet_name = sheet_map[ppap][sheet].filename
      console.log(sheet_name)
      return new Promise(resolve => {
      fetch(`http://104.236.0.12/xlsx/${ppap}/${sheet_name}`)
        .then(response => response.arrayBuffer())
        .then((data) => {
          resolve(data)
        })
      })   
  }

  getForm(form){
      return new Promise(resolve => {
          $.get(`/form/${form}`, (data) => {
              resolve(data)
          })
      })
  }
  
  getView(file){
    return new Promise(resolve => {
      $.get(`/view/${file}`, (data) => {
        resolve(data);
      })
    })
  }
  
  getHTML(file){
      return new Promise(resolve =>{
          $.get( `/component/${file}`, function( data ) {
              resolve(data)
          });
      })
  }

  getProductData(product_uid){
    //http://104.236.0.12/db/product/data/${product_uid}
    this.getRemoteJSON(`http://104.236.0.12/db/product/data/${product_uid}`).then(res => {
      console.log(res)
    })
  }

  setProductData(product_uid, data){
    console.log(`product_uid is ${product_uid}`)
    this.postRemoteJSON(`http://104.236.0.12/db/product/data/${product_uid}`, data).then(res => {
      console.log(res)
    })
  }


  getRemoteJSON(url){
      return new Promise(resolve => {
          fetch(url)
          .then(response => response.json())
          .then((data) => {
              resolve(data)
          })
      })
  }
  postRemoteJSON(url, data){
      return new Promise(resolve => {
          fetch(url, {
              method: 'POST',
              body: data,
              headers: {'Content-Type': 'application/json'}
          }).then(res => res.json())
          .then(json => resolve(json));
    })
  }

  postProductData(){
    return new Promise(resolve => {

    })
  }

}




//helpers are put here since API is called first
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};


module.exports = _API;
