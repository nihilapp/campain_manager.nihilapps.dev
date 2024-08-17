import { IConfigData } from '@/src/entities';

export const configData: IConfigData = {
  title: '캠패인 매니저',
  description: 'D&D 5E 캠페인을 편리하게 관리할 수 있습니다.',
  keywords: '',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://campain_manager.nihilapps.dev',
  image: {
    link: '/opengraph-image.png',
    alt: 'site image',
  },
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  ipBaseUrl() {
    return `${this.url}/api`;
  },
};
