

exports.payment = (req, res, next) => {
    
 const data = [
    {
        id: 1,
        name: 'Robusta',
        price: 120000,
        quantity: 12,
        description: 'Robusta là 1 các loại coffee rất phù hợp với khí hậu, thổ nhưỡng tại vùng Tây Nguyên VN – đặc biệt là vùng đất bazan (Gia lai, Đắk lắc) – hằng năm đạt 90-95% tổng sản lượng cafe VN, mùi hương nồng, không chua, độ cafein cao, thích hợp với khẩu vị người việt, nhưng quá đậm đặc với người ngoại quốc.',
        img: 'http://vfa.gov.vn/data/cafe%201.jpg',
    },
    {
        id: 2,
        name: 'Arabica',
        price: 120000,
        quantity: 12,
        description: 'Là một các loại cafe ở VN có hạt hơi dài, được trồng ở chiều cao trên 600m ( ở Nước Ta chủ yếu được trồng ở Lâm Đồng ), khí hậu lạnh ngắt, được trồng đa phần ở Brasil, và sở hữu tới 2/3 lượng coffee lúc bấy giờ trên thế giới.',
        img: 'http://vfa.gov.vn/data/cafe%201.jpg',
    },
    {
        id: 3,
        name: 'Cherry (Café mít)',
        price: 120000,
        quantity: 12,
        description: 'Trong nhiều chủng loại cafe Nước Ta thì Cherry hay còn gọi là cà phê mít bao gồm 2 giống đó chính là Liberica và Exelsa. Loại này không được thịnh hành lắm, nhưng đây là dòng có công dụng chống chịu sâu bệnh rất chất lượng và công suất không hề thấp. Được trồng ở những vùng đất khô đầy gió và nắng của vùng Cao Nguyên.',
        img: 'http://vfa.gov.vn/data/cafe%201.jpg',
    },
    {
        id: 4,
        name: 'Coffee Culi',
        price: 120000,
        quantity: 12,
        description: 'Nằm ở phía trong số nhiều chủng loại cà phê Nước Ta có hạt no tròn. nhất là trong một trái chỉ có độc tôn một hạt. Vị đắng gắt, mùi thơm mê đắm, hàm lượng cafein cao, nước đặc sánh, đó là quy trình tiến độ kết hợp tinh túy của việc duy nhất.',
        img: 'http://vfa.gov.vn/data/cafe%201.jpg',
    },
    {
        id: 5,
        name: 'Cà phê Moka',
        price: 120000,
        quantity: 12,
        description: 'Moka là một các loại coffee nổi tiếng thuộc chi Arabica, được người Pháp di thực từ trong năm 30 của thế kỉ trước, trồng ở Đà Lạt – Lâm Đồng. Trong các họ, giống cafe này khó trồng nhất, yêu cầu công quan tâm rất kỹ, dể bị sâu bệnh, cần có điều kiện môi trường lẫn kỹ thuật chăm bón tính chất, nhưng năng xuất lại rất ít.',
        img: 'http://vfa.gov.vn/data/cafe%201.jpg',
    },
   
]
    res.render('staff/payment', { title: 'Bán hàng', data});
}

