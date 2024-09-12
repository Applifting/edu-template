import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { SignInPage, SignUpPage } from '@frontend/modules/auth';
import { HomePage, UserDetailPage } from '@frontend/modules/quack';
import {
  AboutPage,
  TermsAndConditionsPage,
} from '@frontend/modules/static-pages';
import { NotFoundPage, PageWrapper } from '@frontend/shared/navigation';

import { PRACTICALS, route } from './route';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<HomePage />} />
      {PRACTICALS.map(({ id, PageComponent, wrapperProps = {} }) => (
        <Route
          path={route.practical(id)}
          key={id}
          element={
            <PageWrapper {...wrapperProps}>
              <PageComponent />
            </PageWrapper>
          }
        />
      ))}
      <Route path={route.about()} element={<AboutPage />} />
      <Route path={route.terms()} element={<TermsAndConditionsPage />} />
      <Route path={route.signIn()} element={<SignInPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route
        path={route.userDetail(':userName')}
        element={<UserDetailPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
