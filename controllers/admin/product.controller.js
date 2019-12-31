import {MAX_WAREHOUSE_QUANTITY} from '../../utils/constanst';
const Product = require('../../models/product.model')
const ObjectId = require("mongodb").ObjectID;
const Origin = require('../../models/origin.model')
const TypeProduct = require('../../models/type-product.model')
const ProductUtils = require('../../utils/product.utils');

exports.list = async (req, res, next) => {
    try {
        const products = await ProductUtils.getList();
        res.render('admin/pages/product', { title: 'Quản lý sản phẩm',products });
    } catch (err) {
        console.log("err: ",err.message)
        res.status(500).render('admin/pages/product', { title: 'Quản lý sản phẩm',products: [], isSuccess: false });
    }
    // res.render('admin/auth/login', { title: 'Trang chủ' });
}

exports.detail = async (req, res, next) => {
    const {id} = req.query;
    console.log(id)
    
    const product = await ProductUtils.findById(id);
    res.render('admin/pages/product-detail', { title: 'Quản lý sản phẩm - Chi tiết', product});
    // res.render('admin/pages/product-detail', { title: 'Quản lý sản phẩm - Chi tiết', id});
}

exports.getDetailToEdit = async (req, res, next) => {
    const { id } = req.query;
    console.log(id)

    const product = await ProductUtils.findById(id);
    const types = await ProductUtils.getTypeProduct();
    const origins = await ProductUtils.getOriginProduct();

    res.render('admin/pages/product-edit', { title: 'Chỉnh sửa sản phẩm', product, types, origins });
    // res.render('admin/pages/product-detail', { title: 'Quản lý sản phẩm - Chi tiết', id});
}

exports.getDataToAddProduct = async (req, res, next) => {
    const types = await ProductUtils.getTypeProduct();
    const origins = await ProductUtils.getOriginProduct();

    res.render('admin/pages/product-add', { title: 'Thêm sản phẩm', types, origins });
}

exports.add = async (req, res, next) => {
    try {
        const data = req.body;
        const product = new Product(data);
        await product.save();

        res.send({ isSuccess: true, message: "Tạo sản phẩm thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Tạo sản phẩm thất bại!" });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Product.deleteOne({ _id: ObjectId(req.body.idProduct)})

        res.send({ isSuccess: true, message: "Xóa sản phẩm thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Xóa sản phẩm thất bại!" });
    }
}

exports.update = async (req, res, next) => {
    try {
        const { name, price, description, idTypeProduct, idOrigin, img } = req.body;
       const product =  await Product.updateOne(
           { _id: ObjectId(req.body.idProduct)},
           {$set: {  name: name, description, idTypeProduct, idOrigin, img , price: parseInt(price)}});

        //    console.log("product: ", product)
        res.send({ isSuccess: true, message: "Sửa sản phẩm thành công" });
    } catch (err) {
        console.log("err: ", err.message);
        res.send({ isSuccess: false, message: "Sửa sản phẩm thất bại!" });
    }
}


exports.listProductImport = async (req, res, next) => {
    try {
        const products = await ProductUtils.getList();

        res.render('admin/pages/import-product', { title: 'Quản lý nhập hàng', products });
    } catch (err) {
        console.log("err: ", err.message)
        res.status(500).render('admin/pages/import-product', { title: 'Quản lý nhập hàng', products: [], isSuccess: false });
    }
}
// Manage import product
exports.importProduct = async (req, res, next) => {
    try {
        // console.log("req: ", req);
        // console.log("req: ", req.body);
        const { quantity, idProduct } = req.body;
        console.log("quan: ", quantity, "id: ", idProduct)
        // check WAREHOUSE
        // get sum quantity product

        const sum = await Product.aggregate([{
            $group: {
                _id: '',
                quantity: { $sum: '$quantity' }
            }
        }])
        const currentSumQuantity = sum[0].quantity
        console.log("curr sum: ", currentSumQuantity)
        console.log(currentSumQuantity + parseInt(quantity) > MAX_WAREHOUSE_QUANTITY)
        console.log(currentSumQuantity + parseInt(quantity))
        console.log(MAX_WAREHOUSE_QUANTITY)

        if (parseInt(currentSumQuantity) + parseInt(quantity) <= parseInt(MAX_WAREHOUSE_QUANTITY)) {
            const product = await Product.updateOne({ _id: new ObjectId(idProduct) },
                { $inc: { quantity: parseInt(quantity) } }
            );
            console.log("finish: ", product);

            res.status(200).send({ isSuccess: true, message: "Nhập hàng thành công", product });
        } else {
            console.log("finish err ");

            res.status(500).send({ isSuccess: false, message: "Kho hàng không đủ chỗ" });
        }


    } catch (err) {
        console.log("err: ", err.message);
        res.status(500).send({ isSuccess: false, message: "Nhập hàng thất bại!" });
    }
}

// Manage export product
exports.exportProduct = async (req, res, next) => {
    try {
        const { quantity, idProduct } = req.body;
        console.log("quan: ", quantity, "id: ", idProduct)
        // check is enough quantity
        const currentProduct = await Product.findById(idProduct)
        if (currentProduct.quantity < quantity) {
            res.status(500).send({ isSuccess: false, message: "Không đủ hàng" });
        } else {
            await Product.updateOne({ _id: idProduct },
                {
                    $inc: { quantity: parseInt(-quantity) }
                })
            res.status(200).send({ isSuccess: true, message: "Xuất hàng thành công" });
        }
    } catch (err) {
        console.log("err: ", err.message);
        res.status(500).send({ isSuccess: false, message: "Xuất hàng thất bại!" });
    }
}

// exports.createData = async (req, res, next) => {
        // // product
        // const data = [
        //     {
        //         name: 'Robusta',
        //         price: 120000,
        //         quantity: 12,
        //         description: 'Robusta là 1 các loại coffee rất phù hợp với khí hậu, thổ nhưỡng tại vùng Tây Nguyên VN – đặc biệt là vùng đất bazan (Gia lai, Đắk lắc) – hằng năm đạt 90-95% tổng sản lượng cafe VN, mùi hương nồng, không chua, độ cafein cao, thích hợp với khẩu vị người việt, nhưng quá đậm đặc với người ngoại quốc.',
        //         img: 'http://vfa.gov.vn/data/cafe%201.jpg',
        //         idTypeProduct: new ObjectId('5e058f995f8e1d2b74538055'),
        //         idOrigin: new ObjectId('5e058da10ab207652c0ad8ec'),
        //     },
        //     {
        //         name: 'Arabica',
        //         price: 120000,
        //         quantity: 12,
        //         description: 'Là một các loại cafe ở VN có hạt hơi dài, được trồng ở chiều cao trên 600m ( ở Nước Ta chủ yếu được trồng ở Lâm Đồng ), khí hậu lạnh ngắt, được trồng đa phần ở Brasil, và sở hữu tới 2/3 lượng coffee lúc bấy giờ trên thế giới.',
        //         img: 'http://vfa.gov.vn/data/cafe%201.jpg',
        //         idTypeProduct: new ObjectId('5e058f995f8e1d2b74538053'),
        //         idOrigin: new ObjectId('5e058da10ab207652c0ad8ec'),
        //     },
        //     {
        //         name: 'Cherry (Café mít)',
        //         price: 120000,
        //         quantity: 12,
        //         description: 'Trong nhiều chủng loại cafe Nước Ta thì Cherry hay còn gọi là cà phê mít bao gồm 2 giống đó chính là Liberica và Exelsa. Loại này không được thịnh hành lắm, nhưng đây là dòng có công dụng chống chịu sâu bệnh rất chất lượng và công suất không hề thấp. Được trồng ở những vùng đất khô đầy gió và nắng của vùng Cao Nguyên.',
        //         img: 'http://vfa.gov.vn/data/cafe%201.jpg',
        //         idTypeProduct: new ObjectId('5e058f995f8e1d2b74538054'),
        //         idOrigin: new ObjectId('5e058da10ab207652c0ad8ee'),
        //     },
        //     {
        //         name: 'Coffee Culi',
        //         price: 120000,
        //         quantity: 12,
        //         description: 'Nằm ở phía trong số nhiều chủng loại cà phê Nước Ta có hạt no tròn. nhất là trong một trái chỉ có độc tôn một hạt. Vị đắng gắt, mùi thơm mê đắm, hàm lượng cafein cao, nước đặc sánh, đó là quy trình tiến độ kết hợp tinh túy của việc duy nhất.',
        //         img: 'http://vfa.gov.vn/data/cafe%201.jpg',
        //         idTypeProduct: new ObjectId('5e058f995f8e1d2b74538054'),
        //         idOrigin: new ObjectId('5e058da10ab207652c0ad8f0'),
        //     },
        //     {
        //         name: 'Cà phê Moka',
        //         price: 120000,
        //         quantity: 12,
        //         description: 'Moka là một các loại coffee nổi tiếng thuộc chi Arabica, được người Pháp di thực từ trong năm 30 của thế kỉ trước, trồng ở Đà Lạt – Lâm Đồng. Trong các họ, giống cafe này khó trồng nhất, yêu cầu công quan tâm rất kỹ, dể bị sâu bệnh, cần có điều kiện môi trường lẫn kỹ thuật chăm bón tính chất, nhưng năng xuất lại rất ít.',
        //         img: 'http://vfa.gov.vn/data/cafe%201.jpg',
        //         idTypeProduct: new ObjectId('5e058f995f8e1d2b74538053'),
        //         idOrigin: new ObjectId('5e058da10ab207652c0ad8ef'),
        //     },
           
        // ]


//     data.map(async item => {
//         const product = new Product(item);
//         await product.save();
//     })
//     const rs = await Product.find();
//     // console.log("rs: ", rs)

//     res.render('admin/main/product', { title: 'Quản lý sản phẩm', payload: rs });
//     // res.render('admin/auth/login', { title: 'Trang chủ' });
// }


