import { z } from "zod";


// Create Create Zod Route Validation
export const createOrderValidationSchema = z.object({
    body: z.object({
        productId: z.string(),
        quantity: z.number().positive(),
    })
});


export const OrderValidations = {
    createOrderValidationSchema,
};