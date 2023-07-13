import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import { changePage } from '../features/allJobs/allJobsSlice';
const PageBtnContainer = () => {
  const {numOfPages, page} = useSelector((store) => store.allJobs);
  
  const dispatch = useDispatch();
  
  const pages = Array.from({length: numOfPages},(_,index) => {
    return index + 1;
  });
  const nextPage = () => {
    let newPage = page + 1;
    if(newPage > numOfPages)
    {
        newPage = 1;
    }
    dispatch(changePage(newPage));
  }
  const prevPage = () => {
    let newPage = page - 1;
    if(newPage < 1)
    {
        newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  }
  
  //   console.log(pages);
  return (
    <main className='pageButtonContainer'>
        <button className='prev-btn' onClick={prevPage}>
            <HiChevronDoubleLeft/>
            prev
        </button>
        <div className='btn-container'>
            {pages.map((pageNumber) => {
                return(
                    <button type='button' className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={() => dispatch(changePage(pageNumber))}>
                        {pageNumber}
                    </button>
                )
            })}
        </div>
        <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </main>
  )
}

export default PageBtnContainer