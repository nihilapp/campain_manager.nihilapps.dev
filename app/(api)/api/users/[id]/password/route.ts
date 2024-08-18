import { NextResponse } from 'next/server';
import { nihilTool } from '@nihilapp/tools';
import { User } from '@prisma/client';
import { ApiError, ApiResponse, NewPasswordDto } from '@/src/entities';
import { DB } from '@/src/utils';

interface Params {
  params: {
    id: number
  }
}

export async function PATCH(req: NextResponse, { params, }: Params) {
  const newPasswordDto: NewPasswordDto = await req.json();

  const findUser = await DB.users().findFirst({
    where: {
      id: params.id,
    },
  });

  const findAuths = await DB.auths().findFirst({
    where: {
      userId: findUser.id,
    },
  });

  const comparedPassword = await nihilTool.bcrypt.dataCompare(
    findAuths.password,
    newPasswordDto.password
  );

  if (!comparedPassword) {
    const response: ApiError = {
      data: null,
      message: '기존 비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
    };

    return Response.json(response, {
      status: 401,
    });
  }

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
