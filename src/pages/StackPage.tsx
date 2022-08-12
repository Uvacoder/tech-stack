import { useAutoAnimate } from '@formkit/auto-animate/react';
import RepoCard from '../components/Repositories/RepoCard';
import { useAppSelector } from '../store';

const StackPage: React.FC = () => {
  const stack = useAppSelector((state) => state.stackSlice.stackList);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <ul ref={parent}>
      {stack.map((item) => (
        <RepoCard key={item.id} repo={item} />
      ))}
    </ul>
  );
};

export default StackPage;
