const { z } = require('zod');

const UserValidationSchema = z.object({
  username: z .string() .min(3, "Username must be at least 3 characters")
              .max(30, "Username must be at most 30 characters").trim()
              .toLowerCase(),
  password: z .string().min(6, "Password must be at least 6 characters"),

 firstName: z .string().max(50, "First name must be at most 50 characters").trim(),

  lastName: z .string().max(50, "Last name must be at most 50 characters").trim(),

  walletAddresses: z.array(
    z.object({
      currency: z.string().nonempty("Currency is required"),
      address: z.string().nonempty("Address is required"),
      createdAt: z.date().default(() => new Date()),
    })
  ).optional() // Allowing empty array if no wallet addresses
});
 
module.exports  = UserValidationSchema