import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { CompanySearch } from '../../company';
import { searchCompanies } from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/hero/Hero';
import Search from '../../components/search/Search';
import PortfolioList from '../../components/portfolio/portfolio-list/PortfolioList';
import CardList from '../../components/card/card-list/CardList';

interface Props {}

const SearchPage: React.FC<Props> = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string>('');

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === 'string') {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.includes(e.target[0].value);
    if (exists) return;
    setPortfolioValues([...portfolioValues, e.target[0].value]);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((p) => p !== e.target[0].value);
    setPortfolioValues(removed);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <PortfolioList
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default SearchPage;
