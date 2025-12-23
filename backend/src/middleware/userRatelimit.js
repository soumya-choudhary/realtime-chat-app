const userHits = new Map();

export const userRateLimit = (limit, windowMs) => {
  return (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return next();

    const now = Date.now();
    if (!userHits.has(userId)) {
      userHits.set(userId, []);
    }

    const hits = userHits.get(userId);
    hits.push(now);

    while (hits.length && hits[0] < now - windowMs) {
      hits.shift();
    }

    if (hits.length > limit) {
      return res.status(429).json({
        message: "Too many actions. Slow down."
      });
    }

    next();
  };
};
