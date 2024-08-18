import { NextResponse } from 'next/server';
import { nihilTool } from '@nihilapp/tools';
import { User } from '@prisma/client';
import { ApiResponse, NewPasswordDto } from '@/src/entities';
import { DB } from '@/src/utils';

interface Params {
  params: {
    id: number
  }
}

export async function PATCH(req: NextResponse, { params, }: Params) {
  const newPasswordDto: NewPasswordDto = await req.json();

  const findAuths = await DB.auths().findFirst({
    where: {
      userId: params.id,
    },
  });

  const hashedNewPassword = await nihilTool.bcrypt.dataToHash(newPasswordDto.newPassword);

  await DB.auths().update({
    where: {
      id: findAuths.id,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  const response: ApiResponse<User> = {
    data: null,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}
