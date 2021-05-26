
class DataFormControl extends HTMLElement{
    constructor(){
        super();


        getHTML('dataFormControl.html').then(html=>{
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

class DataTable extends HTMLElement{
    constructor(){
        super();

        const dataTypeInputs = {
            Number: "<input type='text' placeholder='Number'/>",
            String: "<input type='text' placeholder='String'/>",
            Boolean:"<input type='checkbox'/>",
            Date: `<input type="date" id="start" name="trip-start" value="2021-05-26" min="2018-01-01" max="2099-12-31">`
        }

        getHTML('dataTable.html').then(html => {
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
                    var feildName = data[key].path;

                    $("#data-table-table").append(`
                        <tr>
                            <td> <p>${data[key].path}</p></td><td>${dataTypeInputs[dataType]}</td>
                        </tr>
                    `)
                }
            });

            

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

function getHTML(file){
    return new Promise(resolve =>{
        $.get( `/component/${file}`, function( data ) {
            resolve(data)
        });
    })
}

window.customElements.define("data-table", DataTable)
window.customElements.define("data-form-control", DataFormControl);
