import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, ResponseGithub } from './github.types';

export const githubAPI = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (build) => ({
    getReposByName: build.query<ResponseGithub<IRepo>, string>({
      query: (repoName: string) => ({
        url: `search/repositories`,
        params: { q: repoName, per_page: 20 },
      }),
    }),
  }),
});

export const { useGetReposByNameQuery } = githubAPI;
