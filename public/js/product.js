class ProductManager{
    constructor(){
        this.product_items = [];
    }
    getProducts(){

    }
    
    getProductById(){

    }

    _pushProduct(ProductItem){
        console.log(ProductItem)

    }

    _create_new_product(data){
        console.log(data)
        this._create_product_data().then(_id => {
            console.log(_id)
            if(!_id.error){
                data.productData = _id.uid
                API.insertDocument("productModel", data).then((res) => {
                    console.log(res)
                })
            }
        })
    }

    _create_product_data(){
        return new Promise(resolve => {
            API.insertDocument("productDataModel", {
                "partName":"This is a test part",
                "partRevision":"0.1",
                "jobNumber":"1",
                "firstApproval":"1",
                "checFreq":"1",
                "vis_attr_description1":"thas",
                "vis_attr_description2":"iss",
                "vis_attr_description3":"a",
                "vis_attr_description4":"elaborate",
                "vis_attr_description5":"tst",
                "vis_attr_description6":"to",
                "vis_attr_description7":"ses",
                "vis_attr_description8":"how",
                "vis_attr_description9":"things",
                "vis_attr_description10":"ars",
                //mes-attr-description
                "mes_attr_description1":"working",
                "mes_attr_description2":"the",
                "mes_attr_description3":"tes",
                "mes_attr_description4":"misht",
                "mes_attr_description5":"bse",
                "mes_attr_description6":"out",
                "mes_attr_description7":"sf",
                "mes_attr_description8":"order",
                "mes_attr_description9":"dsending",
                "mes_attr_description10":"dsending",
                //mes-min
                "mes_min1":"how","mes_min2":"data",
                "mes_min3":"is","mes_min4":"displayed",
                "mes_min5":"but",
                "mes_min6":"i",
                "mes_min7":"can",
                "mes_min8":"have",
                "mes_min9":"any",
                "mes_min10":"data",
                //mes-max
                "mes_max2":".4",
                "mes_max1":".4",
                "mes_max3":".4",
                "mes_max4":".4",
                "mes_max5":".4",
                "mes_max6":".4",
                "mes_max7":".4",
                "mes_max8":".4",
                "mes_max9":".4",
                "mes_max10":".4",
                //vis-min
                "vis_min1":".2",
                "vis_min2":".2",
                "vis_min3":".2",
                "vis_min4":".2",
                "vis_min5":".2",
                "vis_min6":".2",
                "vis_min7":".2",
                "vis_min8":".2",
                "vis_min9":".2",
                "vis_min10":".2",
                //vis-mes
                "vis_mes1":".234",
                "vis_mes2":".234",
                "vis_mes3":".234",
                "vis_mes4":".234",
                "vis_mes5":".234",
                "vis_mes6":".234",
                "vis_mes7":".234",
                "vis_mes8":".234",
                "vis_mes9":".234",
                "vis_mes10":".234",
                //vis-max
                "vis_max1":".452",
                "vis_max2":".452",
                "vis_max3":".452",
                "vis_max4":".452",
                "vis_max5":".452",
                "vis_max6":".452",
                "vis_max7":".452",
                "vis_max8":".452",
                "vis_max9":".452",
                "vis_max10":".452",
                "__v":0
                }
            ).then((res) => {
                console.log(res)
                resolve(res)
            })
        })

    }
}

class ProductItem{
    constructor(uid){
        this.uid = uid;
        this.data;
        this.name;
        this._refresh()
    }
    _fresh_init(){
        _create_product_data();
    }


    _refresh(){
        API.getRowById("productModel", this.uid).then(row => {
            this.data = row;
        })
    }
}

