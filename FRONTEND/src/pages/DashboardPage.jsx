import React from 'react'
import AsideDashboard from '../components/AsideDashboard'
import PerfilAdmin from '../components/PerfilAdmin'

import "../styles/Dashboard.css"

function DashboardPage() {
  return (
    <div id='bodydashboard'>
      <AsideDashboard/>
      <PerfilAdmin/>
    </div>
  )
}

export default DashboardPage
