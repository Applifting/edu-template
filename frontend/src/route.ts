import { Practical01Page } from './modules/static-pages/pages/Practical01Page';
import { Practical02Page } from './modules/static-pages/pages/Practical02Page';
import { Practical03Page } from './modules/static-pages/pages/Practical03Page';

export const route = {
  home: () => `/`,
  practical: (id: string) => `/practical/${id}`,
  about: () => `/about`,
  terms: () => `/terms`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  userDetail: (username: string) => `/${username}`,
};

export const todoListStateParamName = 'filter';

export const PRACTICALS = [
  // Practical pages
  { id: '01', PageComponent: Practical01Page, wrapperProps: {} },
  { id: '02', PageComponent: Practical02Page },
  {
    id: '03',
    PageComponent: Practical03Page,
    wrapperProps: { maxW: '80rem', minW: 'none', w: '100%' },
  },
];
