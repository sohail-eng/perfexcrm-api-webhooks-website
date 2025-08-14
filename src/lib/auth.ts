import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-1234567890abcdef';

export interface AuthUser {
  id: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<string> {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  
  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  return token;
}

export async function validateSession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    return null;
  }

  return validateSession(token);
}

export async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (token) {
    await prisma.session.delete({
      where: { token },
    }).catch(() => {});
  }

  cookieStore.delete('admin_token');
}