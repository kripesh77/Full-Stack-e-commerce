const { z } = require("zod");

async function productInputValidation(req, res, next) {
  const sellerId = req.sellerId;
  const reqBodySchema = z.object({
    name: z.string().min(3, "Please Enter valid name"),
    description: z.string().min(6, "Please add a proper description"),
    price: z.number().multipleOf(0.01, "Invalid price"),
    imageUrl: z.url("Please add a valid url"),
    stock: z.number().multipleOf(1),
    category: z.string(),
  });

  const parsedDataWithSuccess = reqBodySchema.safeParse(req.body);

  if (parsedDataWithSuccess.success) {
    req.data = { ...parsedDataWithSuccess.data, creatorId: sellerId };
    next();
  } else {
    res.status(401).json({
      error: parsedDataWithSuccess.error,
    });
  }
}

module.exports = productInputValidation;
