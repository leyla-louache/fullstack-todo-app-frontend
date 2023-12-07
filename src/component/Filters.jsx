import React from 'react'
const Filters = ({All, handlePendingFilter,handleCompletedFilter, colorall, colorpending, colorcomplete, itemleft, clearCompleted}) => {


    return ( 
      <div className='diff-butt'>
         <div>{itemleft} Item left</div>
          <div className="controls">
             <div className="filters">
                <span style={colorall} onClick={All}>All</span>
                <span style={colorpending} onClick={handlePendingFilter}>Pending</span>
                <span style={colorcomplete} onClick={handleCompletedFilter}>Completed</span>
             </div>
         </div>
        <div className='clear-completed' onClick={clearCompleted}>Clear Completed</div>
      </div>
       
       
     );
}
export default Filters;