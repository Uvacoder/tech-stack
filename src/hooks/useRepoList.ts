import { stackActions } from '../components/Stack/stackSlice';
import { useAppSelector, useAppDispatch } from '../store';
import { IRepo } from '../store/github/github.types';

const useRepoList = () => {
  const stack = useAppSelector((state) => state.stackSlice.stackList);
  const { addToStack, removeFromStack } = stackActions;
  const dispatch = useAppDispatch();
  const isSelected = (id: number): boolean =>
    stack.findIndex((item) => item.id === id) >= 0;

  const onRepoClick = (repo: IRepo) => {
    if (!isSelected(repo.id)) return dispatch(addToStack(repo));
    dispatch(removeFromStack(repo.id));
  };

  return { stack, addToStack, removeFromStack, onRepoClick, isSelected };
};

export default useRepoList;
