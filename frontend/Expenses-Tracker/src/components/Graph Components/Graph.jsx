import React from 'react'
import SimpleBarChart from './BarGraph'
import BasicPie from './PieChart'

function Graph({modes,filterDate,setFilterDate}) {
  if(modes==="Bar-Chart")
  {
    return(
        <div>
            <SimpleBarChart filterDate={filterDate} setFilterDate={setFilterDate}/>
            
        </div>
    )
  }
  else{
    return(
        <div className="pieCharts">
          <div className='subChart'>
          <BasicPie filterDate={filterDate} setFilterDate={setFilterDate} type="Income"/>
          <h1>INCOME CHART</h1>
          </div>
       <div className='subChart'>
       <BasicPie filterDate={filterDate} setFilterDate={setFilterDate} type="Spend"/>
       <h1 >SPEND CHART</h1>
       </div>

        </div>
    )
  }
}

export default Graph