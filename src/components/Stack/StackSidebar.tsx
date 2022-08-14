import { useAutoAnimate } from '@formkit/auto-animate/react';
import useRepoList from '../../hooks/useRepoList';
import { IRepo } from '../../store/github/github.types';

const Sidebar: React.FC = () => {
  const { stack, onRepoClick } = useRepoList();
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="flex flex-col border rounded-lg px-4 py-2 mb-2 sticky top-[80px]">
      <div className="text-lg mb-2">My stack</div>
      <ul ref={parent} className="flex flex-col gap-2 w-full">
        {stack.length === 0 && <div>Add some libraries to your stack</div>}
        {stack.map((repo) => (
          <StackItem
            key={repo.id}
            repo={repo}
            onRepoClick={() => onRepoClick(repo)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

const StackItem: React.FC<{
  repo: IRepo;
  onRepoClick: (repo: IRepo) => void;
}> = ({ repo, onRepoClick }) => {
  return (
    <div className="w-full cursor-pointer" onClick={() => onRepoClick(repo)}>
      <span className="whitespace-nowrap">{`📘${repo.owner.login}/`}</span>
      <b>{repo.name}</b>
    </div>
  );
};
