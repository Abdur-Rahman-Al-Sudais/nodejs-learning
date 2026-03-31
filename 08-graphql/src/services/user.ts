import { createHmac, randomBytes } from "node:crypto";
import { prisma } from "../lib/prisma.ts";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  constructor() {}

  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }

  public static getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET!);
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = this.generateHash(salt, password);

    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      },
    });
  }

  private static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;

    const user = await this.getUserByEmail(email);

    if (!user) throw new Error("User not found");

    const userSalt = user.salt;
    const userHashedPassword = this.generateHash(userSalt, password);

    if (userHashedPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = JWT.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
    );

    return token;
  }
}

export default UserService;
