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
    body: z.object({
        name: z.string(),
        brand: TBicycleBrandSchema,
        price: z.number().positive(),
        model: z.string(),
        type: TBicycleTypeSchema,
        description: z.string(),
        quantity: z.number().int().nonnegative(),
        bicycleImage: z.string().url().optional(),
    })
});


// Update Bicycle Zod Route Validation
export const UpdateBicycleValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        brand: TBicycleBrandSchema.optional(),
        price: z.number().positive().optional(),
        model: z.string().optional(),
        type: TBicycleTypeSchema.optional(),
        description: z.string().optional(),
        quantity: z.number().int().nonnegative().optional(),
        bicycleImage: z.string().url().optional(),
    })
});



export const BicycleValidations = {
    createBicycleValidationSchema,
    UpdateBicycleValidationSchema
};