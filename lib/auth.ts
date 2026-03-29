import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// 🔐 Get user from token (SERVER SIDE)
export async function getUserFromToken() {
  try {
    const cookieStore = await cookies(); // ✅ FIX HERE
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;

  } catch {
    return null;
  }
}