import { NextRequest } from 'next/server';
import { User } from '@prisma/client';
import { ApiResponse, UpdateUserDto } from '@/src/entities';
import { DB, tokenCheck } from '@/src/utils';

interface Params {
  params: {
    id: number;
  }
}

export async function GET(_: NextRequest, { params, }: Params) {
  const user = await DB.users().findFirst({
    where: {
      id: params.id,
    },
    include: {
      Master: true,
      Pc: true,
    },
  });

  const response: ApiResponse<User> = {
    data: user,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const { uid, ...updateUserDto }: UpdateUserDto = await req.json();

  // TODO: 이 부분 살피기
  const { isTokenExpire, } = await tokenCheck(uid);

  const updatedUser = await DB.users().update({
    where: {
      id: params.id,
    },
    data: updateUserDto,
  });

  const response: ApiResponse<User> = {
    data: updatedUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function DELETE(_: NextRequest, { params, }: Params) {
  const deletedUser = await DB.users().delete({
    where: {
      id: params.id,
    },
  });

  const response: ApiResponse<User> = {
    data: deletedUser,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}
