import {
  Practical01Page,
  Practical02Page,
} from '@frontend/modules/static-pages';

export const route = {
  home: () => `/`,
  practical: (id: string) => `/practical/${id}`,
  about: () => `/about`,
  terms: () => `/terms`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  userDetail: (userName: string) => `/${userName}`,
};

export const todoListStateParamName = 'filter';

export const PRACTICALS = [
  // Practical pages
  { id: '01', PageComponent: Practical01Page, wrapperProps: {} },
  { id: '02', PageComponent: Practical02Page },
];
