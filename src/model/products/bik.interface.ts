
export interface BikID {
    bikeID: number; 
    name: string; 
    brand: string; 
    price: number; 
    type: 'Road' | 'Mountain' | 'Hybrid' | 'Electric'; 
    description: string; 
    quantity: number; 
    inStock: boolean;
    createdAt?: Date; 
    updatedAt?: Date; 
}
