import React,{useEffect, useState} from 'react'
import "../styles/Dashboard.css"

import Graph from '../components/Graph Components/Graph';
function Dashboard() {
  const [modes,setModes]=useState("Bar-Chart");
  const [filterDate,setFilterDate]=useState("Last Week");
  const handleChange=(e)=>{
    setModes(e.target.value);
   
  }
  const handleFilterDate=(e)=>{
    setFilterDate(e.target.value);
  }

  return (
    <div className="dashboard">
        <div className="dashboard-header">
        
          <p>VISUALIZE EXPENSES</p>
        </div>

     <div className="dashboard-menu">
      <label for="graphTypes" className="labels">Modes of Visualization</label>
      <select className='options' value={modes}  onChange={handleChange}>
        <option  value="Bar-Chart">Bar Chart</option>
        <option value="Pie-Chart">Pie Chart</option>
      </select>
      <select className='options' value={filterDate}  onChange={handleFilterDate}>

        
        <option  value="Last Week">Last 7 Days</option>
        <option value="Last Month">Last Month</option>
        <option value="Last 3 Months">Last 3 Months</option>
        <option value="Last 6 Months">Last 6 Months</option>
        <option value="Last Year">Last 12 Months</option>
      </select>
     </div>
     <div className="dashboard-body">
      
      <Graph modes={modes} filterDate={filterDate} setFilterDate={setFilterDate}/>
     </div>
    </div>
  )
}

export default Dashboard