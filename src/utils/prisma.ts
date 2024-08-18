import { PrismaClient } from '@prisma/client';

export class DB {
  static client() {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };

    let prisma: PrismaClient;

    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
      }
      prisma = globalWithPrisma.prisma;
    }

    return prisma;
  }

  static users() {
    return this.client().user;
  }

  static auths() {
    return this.client().userAuth;
  }

  static campains() {
    return this.client().campain;
  }

  static masters() {
    return this.client().master;
  }

  static sessions() {
    return this.client().session;
  }

  static pcs() {
    return this.client().pc;
  }
}
