const Bill = require('../../models/bill.model')
const Customer = require('../../models/customers.model')
const BillDetail = require('../../models/bill-detail.model')

exports.list = async (req, res, next) => {
    try {
        const bills = await Bill.find()
            .populate('idCustomer')

        res.render('admin/pages/bill', { title: 'Quản lý đơn hàng', bills });
    } catch (err) {
        console.log('err: ', err)
        res.status(500).render('admin/pages/bill', { title: 'Quản lý đơn hàng', bills: [] });
    }
}

exports.detail = async (req, res, next) => {
    try {
        const { idBill } = req.query
        const bills = await BillDetail.find({ idBill })
            .populate({
                path: 'idBill',
                populate: [{
                    path: 'idCustomer'
                }]
            })
            .populate({
                path: 'idProduct',
                populate: [{
                    path: 'idTypeProduct'
                },
                {
                    path: 'idOrigin'
                }]
            })
        res.render('admin/pages/bill-detail', { title: 'Quản lý chi tiết đơn hàng', bills });
    } catch (err) {
        console.log('err: ', err)
        res.status(500).render('admin/pages/bill-detail', { title: 'Quản lý chi tiết đơn hàng', bills: [] });
    }
}