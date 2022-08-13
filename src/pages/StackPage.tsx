import { useAutoAnimate } from '@formkit/auto-animate/react';
import RepoCard from '../components/Repositories/RepoCard';
import { useAppSelector } from '../store';

const StackPage: React.FC = () => {
  const stack = useAppSelector((state) => state.stackSlice.stackList);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-2">My stack</h1>
      <ul ref={parent} className="flex flex-col gap-2">
        {stack.map((item) => (
          <RepoCard key={item.id} repo={item} />
        ))}
      </ul>
    </div>
  );
};

export default StackPage;
