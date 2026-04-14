export const authGuard = {
  resolve: async ({ cookie, headers, jwt, set }: any) => {
    const tokenFromCookie = cookie.auth?.value;

    const tokenFromHeader = headers.authorization?.replace(/^Bearer\s+/i, "");

    const token = tokenFromCookie ?? tokenFromHeader;

    if (!token) {
      set.status = 401;
      throw new Error("Unauthorized: No token provided");
    }

    const payload = await jwt.verify(token).catch((err: any) => {
      console.log(err);
      return null;
    });

    if (!payload) {
      set.status = 401;
      throw new Error("Unauthorized: Invalid token");
    }

    return { user: payload };
  },
};
