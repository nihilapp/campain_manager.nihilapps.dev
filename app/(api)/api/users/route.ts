import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { nihilTool } from '@nihilapp/tools';
import { ApiResponse, CreateUserDto } from '@/src/entities';
import { DB } from '@/src/utils';

export async function GET() {
  const users = await DB.users().findMany({
    include: {
      Master: true,
      Pc: true,
    },
  });

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
      userRole: userRole || 'NORMAL',
    },
  });

  const accessToken = await nihilTool.jwt.createAccessToken({
    payload: { userEmail, userName, },
    secret: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
  });

  const refreshToken = await nihilTool.jwt.createRefreshToken({
    payload: { userEmail, userName, },
    secret: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
  });

  const hashedPassword = await nihilTool.bcrypt.dataToHash(password);

  await DB.auths().create({
    data: {
      userId: newUser.id,
      password: hashedPassword,
      accessToken,
      refreshToken,
    },
  });

  const response: ApiResponse<User> = {
    data: newUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 201,
  });
}
