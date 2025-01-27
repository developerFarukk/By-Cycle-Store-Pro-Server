import { TBicycleBrand, TBicyclestatus, TBicycleType } from "./bicycle.interface";

// Bycycle Model
export const BicycleBrand: TBicycleBrand[] = ['Duranta', 'Atlas', 'Hero', 'Phoenix', 'Tata Stryder', 'Avon Cycles', 'BTwin', 'Giant', 'Cannondale', 'Merida', 'Suzuki', 'Bajaz', 'Royel in fild'];


// Bycycle Type
export const BicycleType: TBicycleType[] = ['Road', 'Mountain', 'Hybrid', 'Electric'];

// Bicycle Stock
export const BicycleStatus: TBicyclestatus[] = ['Stock', 'Stock Out'];


export const BicycleSearchableFields = ['name', 'brand', 'model', 'type', 'description',  ];