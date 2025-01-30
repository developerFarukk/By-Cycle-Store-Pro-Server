import { Model, Types } from "mongoose";

export type TBicycleBrand = 'Duranta' | 'Atlas' | 'Hero' | 'Phoenix' | 'Tata Stryder' | 'Avon Cycles' | 'BTwin' | 'Giant' | 'Cannondale' | 'Merida' | 'Suzuki' | 'Bajaz' | 'Royel in fild';

export type TBicycleType = 'Road' | 'Mountain' | 'Hybrid' | 'Electric';

export type TBicyclestatus = 'Stock' | 'Stock Out' ;

export interface TBicycle {
    id?: Types.ObjectId;
    name: string;
    brand: TBicycleBrand;
    price: number;
    model: string,
    type: TBicycleType
    description: string;
    quantity: number;
    status: TBicyclestatus;
    isDeleted: boolean;
    bicycleImage?: string
}


export interface BicycleModel extends Model<TBicycle> {

    isBicycleExists(_id: string): Promise<TBicycle | null>;

    // getBicycleData(id: string): Promise<Pick<TBicycle, 'name' | 'brand' | 'price' | 'model' | 'type' | 'description' | 'bicycleImage' | 'inStock' | 'quantity'>>;
}


// export interface SpasificBicycleModel extends Model<TBicycle> {
//     getBicycleData(userId: string): Promise<Pick<TBicycle, '_id' | 'title' | 'content' | 'author'>>;
// }