import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res, next) {
    res.status(429).send({
      message: "Too many requests, please try again later.",
    });
  },
});

export default limiter;
