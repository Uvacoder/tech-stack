import { useEffect, useState } from 'react';
import { IRepo } from '../store/github/github.types';
import { useGetReposByNameQuery } from '../store/github/github.api';

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useGetReposByNameQuery(search, {
    skip: search.length < 3,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length > 5) {
    }
  }, [search]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1 className="text-2xl mb-2">Search for library</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-4 py-2 rounded-lg"
          type="text"
          value={search}
          onChange={handleInputChange}
        />
        <button className="border px-4 py-2 rounded-lg">Find</button>
      </div>
      <ul className="flex flex-col max-w-full">
        {isLoading && <div>Loading data...</div>}
        {data
          ? data.items.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          : null}
      </ul>
    </div>
  );
}

const RepoCard: React.FC<{ repo: IRepo }> = ({ repo }) => {
  return (
    <li className="border-b py-2">
      <div>
        <div>{`📘${repo.owner.login}/${repo.name}`}</div>
        <div>{repo.description}</div>
      </div>
    </li>
  );
};
