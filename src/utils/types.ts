//  dto와 분리하는 이유. client에서 보내는 것과 차이
export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  password: string;
};
