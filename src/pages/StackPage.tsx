import RepoCard from '../components/Repositories/RepoCard';
import { useAppSelector } from '../store';

const StackPage: React.FC = () => {
  const stack = useAppSelector((state) => state.stackSlice.stackList);

  return (
    <div>
      {stack.map((item) => (
        <RepoCard key={item.id} repo={item} />
      ))}
    </div>
  );
};

export default StackPage;
