class XSpreadsheetDataManager{
  constructor(){
    this.data_points = [];
  }

  push_data_point(sheet, x, y, value){
    this.data_points.push({sheet:sheet, x: x, y: y, value: value});
  }
}

class XSpreadsheet extends HTMLElement{
  constructor(){
    super();
    this.product_UID = this.getAttribute("product_UID");
    this.sheet = this.getAttribute("sheet");
    this.ppap = this.getAttribute("ppap");
    this.innerHTML = '<div class="luckysheet-container"><div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div></div>'
    this.dataValues = []
    this.manager = new XSpreadsheetDataManager();
  }

  connectedCallback(){
    API.getRowById('productModel', this.product_UID || getCookie('current_prod_uid')).then(part => {
      this.prepareLuckyChart(this.sheet, this.ppap).then(ls => {
        var data_parse_range = 50;

        for(var x = 0; x < ls.getAllSheets().length; x++){
          ls.setSheetActive(x);
          ls.selectHightlightShow();
          for(var i = 0; i < data_parse_range; i++){
            for(var j = 0; j < data_parse_range; j++){
              var cell_value = String(ls.getCellValue(i, j));
              var first_char = cell_value.split("")[0];
              if(cell_value != 'null' && first_char == "$"){
                var p = parseTpl(cell_value, part.productData);
                this.manager.push_data_point(x, j, i, p)
                ls.setCellValue(i, j, p)
              }
            }
          }
        }
        ls.setSheetActive(0)
        console.log(this.manager.data_points)
      })
    });
  }

  prepareLuckyChart(sheet, ppap){
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
  	          	resolve(luckysheet)
  	          }
  	        }
          })

        })
      })
    })
  }

}

window.customElements.define('spreadsheet-view', XSpreadsheet)