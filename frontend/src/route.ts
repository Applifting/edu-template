import {
  Practical01Page,
  Practical02Page,
  Practical03Page,
} from '@frontend/modules/static-pages';

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
