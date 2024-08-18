import { NextRequest } from 'next/server';
import { User } from '@prisma/client';
import { AdminUpdateUserDto, ApiResponse } from '@/src/entities';
import { DB } from '@/src/utils';

interface Params {
  params: {
    id: number;
  }
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const updateUserDto: AdminUpdateUserDto = await req.json();

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
