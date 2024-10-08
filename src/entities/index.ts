// 이 폴더에서는 데이터만을 다룬다. 데이터의 타이핑이나 데이터 그 자체를 여기에 넣어둔다. prisma 등등.

export {
  type ApiResponse,
  type IConfigData,
  type ApiError,
  type ISiteMeta
} from './common/common.types';

export {
  commonStore,
  setDarkMode
} from './common/common.store';

export {
  type CreateUserDto,
  type UpdateUserDto,
  type AdminUpdateUserDto,
  type NewPasswordDto,
  type UserTokenInfo
} from './users/users.types';

export {
  type CreateCampainDto,
  type UpdateCampainDto
} from './campains/campains.types';
