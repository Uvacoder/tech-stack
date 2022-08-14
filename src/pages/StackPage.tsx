import { useAutoAnimate } from '@formkit/auto-animate/react';
import RepoCard from '../components/Repositories/RepoCard';
import useRepoList from '../hooks/useRepoList';

const StackPage: React.FC = () => {
  const [parent] = useAutoAnimate<HTMLUListElement>();
  const { stack, onRepoClick, isSelected } = useRepoList();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-2">My stack</h1>
      <ul ref={parent} className="flex flex-col gap-2">
        {stack.map((repo) => {
          return (
            <RepoCard
              key={repo.id}
              repo={repo}
              isSelected={isSelected(repo.id)}
              onRepoClick={() => onRepoClick(repo)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StackPage;
