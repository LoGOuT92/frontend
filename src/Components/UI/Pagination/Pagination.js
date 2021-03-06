import React,{ useState} from 'react';
import styles from './Pagination.module.styles.css';
 export default function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));

    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {

        setCurrentPage((page) => page + 1);
      }
  
      function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
      }
  
      function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
      }
  
      const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
      };
  
      const getPaginationGroup = () => {
        let pageL = parseInt(pageLimit)
        let x = data.length/pageL

        if((data.length/pageL)/parseInt(x)>1){
          let start = Math.floor((currentPage - 1) / pageL) * pageL;
          return new Array(pageL+1).fill().map((_, idx) => start + idx + 1);
        }
        let start = Math.floor((currentPage - 1) / pageL) * pageL;
        return new Array(pageL).fill().map((_, idx) => start + idx + 1);
        
      };
  
      return (
        <div className="xD">
                          {/* show the posts, 10 posts at a time */}
          <div className="xD2">
            {getPaginatedData().map((d, idx) => (
              <RenderComponent key={idx} data={d} comments={data} />
            ))}
          </div>
      
          <div className="pagination">
            {/* previous button */}
            <button
              onClick={goToPreviousPage}
              className={`next ${currentPage === 1 ? 'disabled' : ''}`}
            >
              prev
            </button>
      
            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
              >
                <span>{item}</span>
              </button>
            ))}
      
            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
              next
            </button>
          </div>

        </div>
      );
  }