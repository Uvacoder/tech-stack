import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { IRepo } from '../../store/github/github.types';
import { stackActions } from '../Stack/stackSlice';

const RepoCard: React.FC<{ repo: IRepo }> = ({ repo }) => {
  const dispatch = useAppDispatch();
  const { addToStack, removeFromStack } = stackActions;
  const stack = useAppSelector((state) => state.stackSlice.stackList);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (stack.find((item) => item.id === repo.id)) return setIsSelected(true);
    setIsSelected(false);
  }, [stack]);

  return (
    <li
      onClick={() => {
        if (!isSelected) return dispatch(addToStack(repo));
        dispatch(removeFromStack(repo.id));
        setIsSelected(false);
      }}
      className={`flex flex-col border-b 
      py-3 px-4 cursor-pointer ${isSelected ? 'bg-green-300' : ''} hover:${
        isSelected ? 'bg-green-200' : 'bg-gray-100'
      } rounded-lg transition`}
    >
      <div className="flex text-lg">
        <div className="inline">
          {`📘${repo.owner.login}/`}
          <b>{repo.name}</b>
        </div>
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
