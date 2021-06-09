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
                "mes_attr_description1":"working",
                "mes_attr_description2":"the",
                "mes_attr_description3":"tes",
                "mes_attr_description4":"misht",
                "mes_attr_description5":"bse",
                "mes_attr_description6":"out",
                "mes_attr_description7":"sf",
                "mes_attr_description8":"order",
                "mes_attr_description9":"dsending",
                "mes_min1":"how","mes_min2":"data",
                "mes_min3":"is","mes_min4":"displayed",
                "mes_min5":"but",
                "mes_min6":"i",
                "mes_min7":"can",
                "mes_min8":"have",
                "mes_min9":"any",
                "mes_min10":"data",
                "__v":0}
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

