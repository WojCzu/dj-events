import cookie from "cookie";

export const parseCookies = req => cookie.parse(req?.headers.cookie || "");
