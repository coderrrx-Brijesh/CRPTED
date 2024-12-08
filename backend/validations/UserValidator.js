const { z } = require('zod');

// Zod validation schema for the wallet address

const walletAddressSchema = z.object({
  currency: z.string().min(1, "Currency is required"),  // Ensure the currency is provided
  address: z.string().min(1, "Address is required"),
});

// Zod validation schema for the User

const SignUpSchemaValidator = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(8, "Password must be at least 6 characters"),
  firstName: z.string()
    .max(50, "First name cannot exceed 50 characters")
    .trim()
    .min(1, "First name is required"),
  lastName: z.string()
    .max(50, "Last name cannot exceed 50 characters")
    .trim()
    .min(1, "Last name is required"),
  walletAddresses: z.array(walletAddressSchema).refine(walletAddresses => walletAddresses.length > 0, "At least one wallet address is required"),
});
const SignInSchemaValidator = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(8, "Password must be at least 6 characters"),
});


module.exports={SignUpSchemaValidator,SignInSchemaValidator};