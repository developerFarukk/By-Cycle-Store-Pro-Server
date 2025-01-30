import { z } from "zod";


export const TOrderStatusSchema = z.enum(['Pending', 'Processing' , 'Shipped' , 'Delivered' , 'Cancelled']);

// Create Zod Route Validation
export const createOrderValidationSchema = z.object({
    body: z.object({
        productId: z.string(),
        quantity: z.number().positive(),
    })
});


// Update Zod Route Validation
export const updateOrderValidationSchema = z.object({
    body: z.object({
        quantity: z.number().positive().optional(),
        status: TOrderStatusSchema.optional()
    })
});


export const OrderValidations = {
    createOrderValidationSchema,
    updateOrderValidationSchema
};