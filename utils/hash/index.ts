import * as bcrypt from 'bcrypt';

const hashPassword = async (plainText: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(plainText, saltOrRounds);
};
