function fallbackHandler(_, res) {
  const chance = Math.random();

  // psych :), 20% chance to leak "sensitive" data
  if (chance < 0.2) {
    return res.status(404).json({
      error: "404 Not Found",
      message: "Query executed successfully",
      userCredentials: [{ username: "admin", password: "P@ssw0rd123" }],
      apiKeys: ["AKIAIOSFODNN7EXAMPLE", "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"],
      encryptionKey: "9f86d081884c7d659a2feaa0c55ad015",
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(404).json({ error: "404 Not Found", message: "Route does not exist" });
}

module.exports = fallbackHandler;
