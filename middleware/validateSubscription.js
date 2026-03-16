import Joi from "joi";

const subscriptionSchema = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  plan: Joi.string().valid("free", "basic", "premium").required().messages({
    "any.only": "Plan must be one of: free, basic, premium",
    "any.required": "Plan is required",
  }),
  expiryDate: Joi.date().min("now").required().messages({
    "date.min": "Expiry date must be in the future",
    "any.required": "Expiry date is required",
  }),
});

export const validateSubscription = (req, res, next) => {
  const { error, value } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });
  }
  req.body = value;
  next();
};
