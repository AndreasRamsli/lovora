async function getBetterAuthRuntime() {
  return import("../../auth/better-auth.mjs");
}

module.exports = {
  getBetterAuthRuntime,
};
