import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    //   use userId or ip address as the key in other apps
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many request, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error:", error);
    next(error);
  }
};

export default ratelimiter;
