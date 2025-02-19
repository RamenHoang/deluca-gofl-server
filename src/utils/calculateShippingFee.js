
const calculateShippingFee = (deliveryMethod) => {
    switch(deliveryMethod) {
        case 'delivery-basic':
            return 15000;
        case 'delivery-fast':
            return 30000;
    }
}

module.exports = calculateShippingFee;
