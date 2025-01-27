import { z } from "zod";

export const TBicycleBrandSchema = z.enum([
    'Duranta',
    'Atlas',
    'Hero',
    'Phoenix',
    'Tata Stryder',
    'Avon Cycles',
    'BTwin',
    'Giant',
    'Cannondale',
    'Merida',
    'Suzuki',
    'Bajaz',
    'Royel in fild',
]);


export const TBicycleTypeSchema = z.enum(['Road', 'Mountain', 'Hybrid', 'Electric']);


// Create Bicycle Zod Route Validation
export const createBicycleValidationSchema = z.object({
    name: z.string(),
    brand: TBicycleBrandSchema,
    price: z.number().positive(),
    model: z.string(),
    type: TBicycleTypeSchema,
    description: z.string(),
    quantity: z.number().int().nonnegative(),
    inStock: z.boolean(),
    isDeleted: z.boolean(),
    bicycleImage: z.string().url().optional(),
});



export const BicycleValidations = {
    createBicycleValidationSchema,
};