import { IRepo } from '../../store/github/github.types';

const RepoCard: React.FC<{
  repo: IRepo;
  isSelected: boolean;
  onRepoClick: (repo: IRepo) => void;
}> = ({ repo, isSelected = false, onRepoClick }) => {
  return (
    <li
      onClick={() => onRepoClick(repo)}
      className={`flex flex-col border-b 
      py-3 px-4 cursor-pointer ${isSelected ? 'bg-green-300' : ''} hover:${
        isSelected ? 'bg-green-200' : 'bg-gray-100'
      } rounded-lg transition`}
    >
      <div className="flex text-lg">
        <a
          onClick={(e) => e.stopPropagation()}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="border-b-blue-400 hover:border-b inline">
            {`📘${repo.owner.login}/`}
            <b>{repo.name}</b>
          </div>
        </a>
      </div>
      <div>{repo.description}</div>
      <div className="flex text-sm mt-2 font-mono gap-4">
        <div>⭐{repo.stargazers_count}</div>
        <div>🔀{repo.forks_count}</div>
      </div>
    </li>
  );
};

export default RepoCard;
