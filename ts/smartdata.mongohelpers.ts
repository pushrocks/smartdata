export const addUsername = (mongoUrlArg: string, usernameArg: string): string => {
  return mongoUrlArg.replace('<USERNAME>', usernameArg);
};

export const addPassword = (mongoUrlArg: string, passwordArg: string): string => {
  return mongoUrlArg.replace('<PASSWORD>', passwordArg);
};
