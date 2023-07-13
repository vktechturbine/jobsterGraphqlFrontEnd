import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { handleChange,clearFilters } from "../features/allJobs/allJobsSlice";
export const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, searchOptions } = useSelector((store) => store.allJobs);
  const [localSearch, setLocalSearch] = useState('');
  const { jobTypeOption, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if(isLoading) return;
    dispatch (handleChange({name:e.target.name,value:e.target.value}));
  };
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({name:e.target.name,value:e.target.value}))
      },1000);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  const optimizedDebounce = useMemo(() => debounce() , []);
  return (
    <main className="searchContainer">
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
           <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOption]}
          />
           <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={searchOptions}
          />
          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        </div>
      </form>
    </main>
  );
};
