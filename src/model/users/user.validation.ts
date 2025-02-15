import { z } from "zod"


// Create user validation
const userValidationSchema = z.object({
    body: z.object({

        name: z.string({ required_error: "Name must be a string" })
            .max(20, { message: "Name must be less than 20 characters" }),

        email: z.string({ required_error: "Please Inpute your Email" }).email(),

        password: z
            .string({ required_error: "Please Inpute Valid password" })
            .min(4, { message: 'Password must be at least 4 characters' })
            .max(20, { message: 'Password must be less than 20 characters' }),

        address: z.string({ required_error: "address must be a string" })
            .max(70, { message: "address must be less than 70 characters" }),

        mobile: z.string({ required_error: "Mobile must be a string" })
            .max(11, { message: "Mobile must be less than 11 characters" }),
    }),

});


// LogIn Validation
const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Id is required.' }),
        password: z.string({ required_error: 'Password is required' }),
    }),
});


// LogIn Validation
const UpdateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        adderss: z.string().optional(),
        mobile: z.string().optional(),
        status: z.enum(['in-progress' , 'blocked']).optional(),
        role: z.enum(['admin' , 'customer']).optional(),

    }),
});


// LogIn Validation
const passwordChangeUserValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'Password is required' }),
        newPassword: z.string({ required_error: 'Password is required' }),
    }),
});

export const UserValidation = {
    userValidationSchema,
    loginValidationSchema,
    UpdateUserValidationSchema,
    passwordChangeUserValidationSchema
};