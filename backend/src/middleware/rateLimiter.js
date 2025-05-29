import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {

    //////////////////
    // const userId = req.params.userId || req.body.userId;

    const { success } = await ratelimit.limit("my");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();

  } catch (error) {
    console.log("Rate Limiter Error:", error);
    next(error);
  }
};

export default rateLimiter;