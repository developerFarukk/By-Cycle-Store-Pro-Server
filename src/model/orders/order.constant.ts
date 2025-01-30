

export const OrderSearchableFields = ['user', 'productId', '_id', 'paymentStatus', 'status'];


const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const isValidStatusTransition = (currentStatus: string, newStatus: string): boolean => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const newIndex = statusOrder.indexOf(newStatus);

    return newIndex > currentIndex;
};