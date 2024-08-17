import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { DB } from '@/src/utils/prisma';
import { ApiResponse, CreateUserDto } from '@/src/entities';

export async function GET() {
  const users = await DB.users().findMany();

  const response = {
    data: users,
    message: 'ok',
  } satisfies ApiResponse<User[]>;

  return Response.json(response, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const {
    userEmail, userName, password, userRole,
  }: CreateUserDto = await req.json();

  const newUser = await DB.users().create({
    data: {
      userEmail,
      userName,
    },
  });

  const response: ApiResponse<User> = {
    data: newUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}
