export const addPassword = (mongoUrlArg: string, passwordArg: string): string => {
  return mongoUrlArg.replace('<PASSWORD>', passwordArg);
};
