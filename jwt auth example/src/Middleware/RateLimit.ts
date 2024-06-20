import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60000,
  limit: 3,
  message: "Too Many Requests !",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});

export default limiter;
