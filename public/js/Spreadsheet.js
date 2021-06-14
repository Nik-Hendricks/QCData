class XSpreadsheetDataManager{
  constructor(product_uid){
    this.data = {}
    this.data_points = {};
    this.prod_uid = product_uid || getCookie('current_prod_uid');
  }

  push_data_point(sheet, r, c, key){
    this.data_points[`${r}${c}`] = key;
    console.log(this.data_points)
  }


  checkIsDataCell(r, c){
    if(this.data_points[`${r}${c}`]){
      return this.data_points[`${r}${c}`];
    }else{
      return false
    }
  }

  save_data_points(){
      API.setProductData(this.prod_uid, JSON.stringify(this.data))
  }
}

class XSpreadsheet extends HTMLElement{
  constructor(){
    super();
    this.data_parse_range = 50;
    this.product_UID = this.getAttribute("product_UID");
    this.sheet = this.getAttribute("sheet");
    this.ppap = this.getAttribute("ppap");
    this.innerHTML = '<div class="luckysheet-container"><div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div></div>'
    this.manager = new XSpreadsheetDataManager(this.product_UID);
    this.isLoaded = false;
  }

  connectedCallback(){
    var scope = this;
    API.getRowById('productModel', this.product_UID || getCookie('current_prod_uid')).then(part => {
      this.prepareLuckyChart(this.sheet, this.ppap).then(ls => {
        for(var x = 0; x < ls.getAllSheets().length; x++){
          ls.setSheetActive(x);
          for(var i = 0; i < this.data_parse_range; i++){
            for(var j = 0; j < this.data_parse_range; j++){
              var cell_value = String(ls.getCellValue(i, j));
              var first_two_char = cell_value.substr(0,2);
              if(cell_value != 'null' && first_two_char == "${"){
                this.manager.push_data_point(1, i, j, cell_value)
                var p = parseTpl(cell_value, part.productData);
                ls.setCellValue(i, j, p)
              }
            }
          }
        }
        ls.setSheetActive(0)
      }).then(() => {
        this.isLoaded = true;
      })
    })

    
  }



  prepareLuckyChart(sheet, ppap){
    var scope = this;
    return new Promise(resolve => {
      API.getXLSX(sheet, ppap).then(data => {
        //Configuration item
        LuckyExcel.transformExcelToLucky(data, function(exportJson, luckysheetfile){
          luckysheet.destroy();

          var ls = luckysheet.create({
            container: 'luckysheet', // luckysheet is the container id
            data:exportJson.sheets,
            title:exportJson.info.name,
            allowEdit: true,
            forceCalculation: false,
            hook:{
  		        workbookCreateAfter:function(){
                //scope.mapDataPoints(luckysheet);
  	          	resolve(luckysheet)
  	          },
              cellUpdated:function(row, collumn, p){
                console.log(p)
                var r = row;
                var c = collumn;
                var newCellValue = luckysheet.getCellValue(r, c)
                var is_data_cell = scope.manager.checkIsDataCell(r, c)
                if(is_data_cell != false){
                  scope.manager.data[is_data_cell] = newCellValue
                  console.log(scope.isLoaded)
                  if(scope.isLoaded == true){
                    scope.manager.save_data_points()
                  }
                }
              }
  	        }
          })

        })
      })

    })
  }



}

window.customElements.define('spreadsheet-view', XSpreadsheet)