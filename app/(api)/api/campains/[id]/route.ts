import { NextRequest } from 'next/server';
import { Campain } from '@prisma/client';
import { DB } from '@/src/utils';
import { ApiResponse, UpdateCampainDto } from '@/src/entities';

interface Params {
  params: {
    id: number;
  }
}

export async function GET(_: NextRequest, { params, }: Params) {
  const campain = await DB.campains().findFirst({
    where: {
      id: params.id,
    },
  });

  const response: ApiResponse<Campain> = {
    data: campain,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function PATCH(req: NextRequest, { params, }: Params) {
  const updateCampainDto: UpdateCampainDto = await req.json();

  const updatedCampain = await DB.campains().update({
    where: {
      id: params.id,
    },
    data: updateCampainDto,
  });

  const response: ApiResponse<Campain> = {
    data: updatedCampain,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function DELETE(_: NextRequest, { params, }: Params) {

}
