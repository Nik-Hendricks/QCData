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
                "vis_attr_description1":" ",
                "vis_attr_description2":" ",
                "vis_attr_description3":" ",
                "vis_attr_description4":" ",
                "vis_attr_description5":" ",
                "vis_attr_description6":" ",
                "vis_attr_description7":" ",
                "vis_attr_description8":" ",
                "vis_attr_description9":" ",
                "vis_attr_description10":" ",
                //mes-attr-description
                "mes_attr_description1":" ",
                "mes_attr_description2":" ",
                "mes_attr_description3":" ",
                "mes_attr_description4":" ",
                "mes_attr_description5":" ",
                "mes_attr_description6":" ",
                "mes_attr_description7":" ",
                "mes_attr_description8":" ",
                "mes_attr_description9":" ",
                "mes_attr_description10":" ",
                //mes-min
                "mes_min1":0,
                "mes_min2":0,
                "mes_min3":0,
                "mes_min4":0,
                "mes_min5":0,
                "mes_min6":0,
                "mes_min7":0,
                "mes_min8":0,
                "mes_min9":0,
                "mes_min10":0,
                //mes-max
                "mes_max2":0,
                "mes_max1":0,
                "mes_max3":0,
                "mes_max4":0,
                "mes_max5":0,
                "mes_max6":0,
                "mes_max7":0,
                "mes_max8":0,
                "mes_max9":0,
                "mes_max10":0,
                //vis-min
                "vis_min1":0,
                "vis_min2":0,
                "vis_min3":0,
                "vis_min4":0,
                "vis_min5":0,
                "vis_min6":0,
                "vis_min7":0,
                "vis_min8":0,
                "vis_min9":0,
                "vis_min10":0,
                //vis-mes
                "vis_mes1":0,
                "vis_mes2":0,
                "vis_mes3":0,
                "vis_mes4":0,
                "vis_mes5":0,
                "vis_mes6":0,
                "vis_mes7":0,
                "vis_mes8":0,
                "vis_mes9":0,
                "vis_mes10":0,
                //vis-max
                "vis_max1":0,
                "vis_max2":0,
                "vis_max3":0,
                "vis_max4":0,
                "vis_max5":0,
                "vis_max6":0,
                "vis_max7":0,
                "vis_max8":0,
                "vis_max9":0,
                "vis_max10":0,
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

