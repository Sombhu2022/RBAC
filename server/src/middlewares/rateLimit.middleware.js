import { aj } from "../config/arcjet.config.js";


export const rateLimit = async (req, res, next) => {
    try {
        // Deduct 5 tokens from the rate limit bucket for this request
        const decision = await aj.protect(req, { requested: 5 });
        console.log("Arcjet decision:", decision);

        // Check if the request is denied and handle accordingly
        if (decision.isDenied()) {

            // Too Many Requests or Forbidden
            const statusCode = decision.reason.isRateLimit() ? 429 : 403; 

            // find what type of error .
            const error =
            decision.reason.isRateLimit()
                ? "You’re sending requests too quickly! Please wait for 30 seconds and try again. "
                : decision.reason.isBot()
                    ? "Oops! Bots aren’t allowed here. If you’re human, please try again! "
                    : "Access denied! We couldn’t process your request this time. Please try again later. ";
        
            return res.status(statusCode).json({ error });
        }

        // If the request passes, proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Error in rate limit middleware:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
