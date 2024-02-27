import { Link, useRouteError } from 'react-router-dom';

//components
import MainNavigation from '../components/ui/Layout/MainNavigation';
import Section from '../components/ui/Layout/Section';
import Text from '../components/ui/Information/Text';

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <MainNavigation />
      <Section>
        <Text className="mb-4">잘못된 경로입니다.</Text>
        <Link to="/" className="block text-center border py-2">
          홈으로 돌아가기
        </Link>
      </Section>
    </>
  );
}

export default ErrorPage;
