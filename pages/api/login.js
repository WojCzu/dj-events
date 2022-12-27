import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const { user, error, jwt: _jwt } = await strapiRes.json();
    if (strapiRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", _jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, //1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user });
    } else {
      const status = error?.status || strapiRes.status || 400;

      const combinedDetails = error?.details.errors
        ?.map(({ message }) => message)
        .join(",\n");

      const message =
        combinedDetails ||
        error?.message ||
        strapiRes.statusText ||
        "Something went wrong";

      res.status(status).json({ message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
