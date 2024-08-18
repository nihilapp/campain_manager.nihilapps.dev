import { nihilTool } from '@nihilapp/tools';
import { UserTokenInfo } from '@/src/entities';
import { DB } from '@/src/utils/prisma';

export async function tokenCheck(uid: string) {
  // 유저를 생성하는 작업 외의 모든 부분에서 확인.

  // 1. uid를 받아서 토큰을 찾은 후, 검사해서 만료되었는지 확인
  const findUser = await DB.users().findFirst({
    where: {
      uid,
    },
  });

  const findAuth = await DB.auths().findFirst({
    where: {
      id: findUser.id,
    },
  });

  const accessTokenInfo = await nihilTool.jwt.verifyToken<UserTokenInfo>(
    findAuth.accessToken,
    'accessToken',
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
  );

  const refreshTokenInfo = await nihilTool.jwt.verifyToken<UserTokenInfo>(
    findAuth.refreshToken,
    'refreshToken',
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET
  );

  const isTokenExpire = nihilTool.jwt.isExpired(accessTokenInfo.exp);

  console.log(isTokenExpire);
  // 2. 만료되었으면 리프레시 토큰을 이용해서 새로운 토큰을 부여함.
  // 3. 리프레시 토큰마저도 만료가 되었으면 로그아웃 처리.

  return {
    isTokenExpire: false,
  };
}
