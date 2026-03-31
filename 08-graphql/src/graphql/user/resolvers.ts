import UserService, {
  type CreateUserPayload,
  type GetUserTokenPayload,
} from "../../services/user.ts";

export const queries = {
  async getUserToken(_: any, paload: GetUserTokenPayload) {
    const token = await UserService.getUserToken(paload);

    console.log(token);

    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
};

export const mutations = {
  async createUser(_: any, paload: CreateUserPayload) {
    const res = await UserService.createUser(paload);

    return res.id;
  },
};

export const resolvers = { queries, mutations };
