import { CampainStatus } from '@prisma/client';

export interface CreateCampainDto {
  uid: string;
  userId: number;
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  campainStatus?: CampainStatus;
}

export interface UpdateCampainDto {
  uid: string;
  name?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  campainStatus?: CampainStatus;
}
