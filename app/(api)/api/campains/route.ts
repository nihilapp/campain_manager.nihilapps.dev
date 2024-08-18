import { Campain } from '@prisma/client';
import { NextRequest } from 'next/server';
import { DB } from '@/src/utils';
import { ApiResponse, CreateCampainDto } from '@/src/entities';

export async function GET() {
  const campains = await DB.campains().findMany({
    include: {
      Master: true,
      Pc: true,
    },
  });

  const response: ApiResponse<Campain[]> = {
    data: campains,
    message: 'ok',
  };

  return Response.json(response, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { userId, ...createCampainDto }: CreateCampainDto = await req.json();

  const newCampain = await DB.campains().create({
    data: createCampainDto,
  });

  await DB.masters().create({
    data: {
      userId,
      campainId: newCampain.id,
      masterType: 'MAIN_MASTER',
    },
  });

  const response: ApiResponse<Campain> = {
    data: newCampain,
    message: 'ok',
  };

  return Response.json(response, {
    status: 201,
  });
}
