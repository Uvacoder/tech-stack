import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { stackActions } from './stackSlice';

const Stack: React.FC = () => {
  const stack = useAppSelector((state) => state.stackSlice.stackList);
  const dispatch = useAppDispatch();
  const { removeFromStack } = stackActions;
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="flex flex-col border rounded-lg px-4 py-2 mb-2 sticky top-[80px]">
      <div className="text-lg mb-2">My stack</div>
      <ul ref={parent} className="flex flex-col gap-2 w-full">
        {stack.length === 0 && <div>Add some libraries to your stack</div>}
        {stack.map((item) => (
          <div
            className="w-full cursor-pointer"
            key={item.id}
            onClick={() => dispatch(removeFromStack(item))}
          >
            <span className="whitespace-nowrap">{`📘${item.owner.login}/`}</span>
            <b>{item.name}</b>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Stack;
