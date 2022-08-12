import { IRepo } from '../../store/github/github.types';

const RepoCard: React.FC<{ repo: IRepo }> = ({ repo }) => {
  return (
    <li className="flex gap-4 justify-between items-center border-b py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg transition">
      <div className="flex flex-col basis-4/5">
        <div className="flex text-lg">
          <div>{`📘${repo.owner.login}/`}</div>
          <div className="font-bold">{repo.name}</div>
        </div>
        <div>{repo.description}</div>
        <div className="flex text-sm mt-2 font-mono gap-4">
          <div>⭐{repo.stargazers_count}</div>
          <div>🔀{repo.forks_count}</div>
        </div>
      </div>
    </li>
  );
};

export default RepoCard;
