import React from 'react'
import AsideDashboard from '../components/AsideDashboard'
import PerfilAdmin from '../components/PerfilAdmin'
import Alerts from '../components/Alerts'
import UltimasPublicaciones from '../components/UltimasPublicaciones'

import UserRegi from '../components/UserRegi'
import DetallesOfer from '../components/DetallesOfer'
import PublicDesact from '../components/PublicDesact'

import "../styles/Dashboard.css"


function DashboardPage() {
  return (
    <div id='bodydashboard'>
      <AsideDashboard/>
      {/* <PerfilAdmin/> */}
      {/* <UltimasPublicaciones/> */}
      {/* <UserRegi/> */}
      {/* <Alerts/> */}
      {/* <PublicDesact/> */}
        <DetallesOfer/> 

    </div>
  )
}

export default DashboardPage
