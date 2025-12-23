const attempts = new Map();

export const loginAttemptLimit = (req, res, next) => {
  const key = req.body.email;
  if (!key) return next();

  const now = Date.now();
  if (!attempts.has(key)) {
    attempts.set(key, []);
  }

  const tries = attempts.get(key);
  tries.push(now);

  while (tries.length && tries[0] < now - 15 * 60 * 1000) {
    tries.shift();
  }

  if (tries.length > 5) {
    return res.status(429).json({
      message: "Too many login attempts for this account"
    });
  }

  next();
};
