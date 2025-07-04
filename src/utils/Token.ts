import jwt from 'jsonwebtoken';

export const generateToken = (payload: string | object, expiresIn = '1h') => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // @ts-expect-error
  return jwt.sign(payload, secret, { expiresIn });
};