const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()

module.exports = {
    getAll: (req, res) => {
        sneaks.getProducts(req.body.search, (req.body.page?req.body.page+1:1)*12, function(err, products) {
            console.log(products)
            // pagnProducts = []
            // if(!!products) {
            //     for(let i = 0; i < products.length; i += 12) {
            //         const page = products.slice(i, i + 12)
            //         pagnProducts.push(page)
            //     }
            //     res.json(pagnProducts[req.query.page])
            // } else {
            //     res.json({message: "No Shoes Found"})
            // }
            res.json(products)
        })
    },
    getOneById: (req, res) => {
        sneaks.findOne(req.params.id, function(err, shoe) {
            if (err) {
                res.send("Product Not Found")
            } else {
                res.json(shoe)
            }
        })
    }
}