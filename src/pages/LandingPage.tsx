import React, { useEffect, useState } from 'react';
import { IRepo } from '../store/github/github.types';
import { useGetReposByNameQuery } from '../store/github/github.api';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../store';
import { stackActions } from '../components/Stack/stackSlice';

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search);
  const { data, isLoading, isError } = useGetReposByNameQuery(debouncedValue, {
    skip: debouncedValue.length < 3,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-[50%] max-w-[50%] mx-auto">
      <h1 className="text-2xl mb-2">Select library to add to your stack</h1>
      <SearchBar search={search} handleInputChange={handleInputChange} />
      <ul className="flex flex-col max-w-full">
        {isLoading && <div>Loading data...</div>}
        {isError && <div className="text-red-500">Something went wrong</div>}
        {data && search.length >= 3 && !isLoading ? (
          <ReposList repos={data.items} />
        ) : null}
      </ul>
    </div>
  );
}

const SearchBar: React.FC<{
  search: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ search, handleInputChange }) => {
  return (
    <div className="flex gap-2 mb-4 text-lg">
      <input
        className="w-full border px-4 py-2 rounded-lg"
        type="text"
        placeholder="Enter repository name (atleast 3 characters)..."
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
};

const ReposList: React.FC<{ repos: IRepo[] }> = ({ repos }) => {
  return (
    <>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </>
  );
};

const RepoCard: React.FC<{ repo: IRepo }> = ({ repo }) => {
  const dispatch = useAppDispatch();
  const { addToStack, removeFromStack } = stackActions;
  const stack = useAppSelector((state) => state.stackSlice.stackList);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (stack.find((item) => item.id === repo.id)) setIsSelected(true);
  }, [stack]);

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
      <button
        onClick={() => {
          if (!isSelected) return dispatch(addToStack(repo));
          dispatch(removeFromStack(repo));
          setIsSelected(false);
        }}
        className={`h-fit basis-1/5 mt-2 border rounded-lg px-4 py-3 
        bg-${
          !isSelected ? 'cyan' : 'red'
        }-400 text-stone-900 transition hover:bg-${
          !isSelected ? 'cyan' : 'red'
        }-300`}
      >
        {!isSelected ? 'Add to stack' : 'Remove from stack'}
      </button>
    </li>
  );
};
