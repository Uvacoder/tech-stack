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
    if (stack.find((item) => item.id === repo.id)) setIsSelected(true);
  }, [stack]);

  return (
    <li
      onClick={() => {
        if (!isSelected) return dispatch(addToStack(repo));
        dispatch(removeFromStack(repo));
        setIsSelected(false);
      }}
      className="flex gap-4 justify-between items-center border-b py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg transition"
    >
      <input
        type="checkbox"
        checked={isSelected}
        className="border rounded-lg px-4 py-3"
      />
      <div className="flex flex-col w-full">
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
