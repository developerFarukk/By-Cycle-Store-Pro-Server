import { Model } from "mongoose";

export type TBicycleBrand = 'Duranta' | 'Atlas' | 'Hero' | 'Phoenix' | 'Tata Stryder' | 'Avon Cycles' | 'BTwin' | 'Giant' | 'Cannondale' | 'Merida' | 'Suzuki' | 'Bajaz' | 'Royel in fild';

export type TBicycleType = 'Road' | 'Mountain' | 'Hybrid' | 'Electric';

export interface TBicycle {
    name: string;
    brand: TBicycleBrand
    price: number;
    model: string,
    type: TBicycleType
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted: boolean;
    bicycleImage?: string
}


export interface BicycleModel extends Model<TBicycle> {
    isUserExists(id: string): Promise<TBicycle | null>;
}