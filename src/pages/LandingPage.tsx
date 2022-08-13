import React, { useMemo, useState } from 'react';
import { IRepo } from '../store/github/github.types';
import { useGetReposByNameQuery } from '../store/github/github.api';
import useDebounce from '../hooks/useDebounce';
import RepoCard from '../components/Repositories/RepoCard';
import Stack from '../components/Stack/Stack';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function LandingPage() {
  const [parent] = useAutoAnimate<HTMLUListElement>();
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search);
  const { data, isLoading, isError, isFetching } = useGetReposByNameQuery(
    debouncedValue,
    {
      skip: debouncedValue.length < 3,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:gap-10">
      <div className="md:basis-3/12">
        <Stack />
      </div>
      <div className="md:basis-9/12 md:mx-auto">
        <SearchBar search={search} handleInputChange={handleInputChange} />
        <ul ref={parent} className="flex flex-col max-w-full gap-2 mb-4">
          {(isLoading || isFetching) && <div>Loading data...</div>}
          {isError && <div className="text-red-500">Something went wrong</div>}
          {data && search.length >= 3 && !isLoading && !isFetching ? (
            <ReposList repos={data.items} />
          ) : null}
        </ul>
      </div>
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
