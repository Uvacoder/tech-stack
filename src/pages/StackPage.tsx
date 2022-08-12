import { useAppSelector } from '../store';

const StackPage: React.FC = () => {
  const stack = useAppSelector((state) => state.stackSlice.stackList);

  return (
    <div>
      {stack.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};

export default StackPage;
