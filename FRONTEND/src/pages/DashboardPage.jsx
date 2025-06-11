import React from 'react'
import AsideDashboard from '../components/AsideDashboard'
import PerfilAdmin from '../components/PerfilAdmin'
import Alerts from '../components/Alerts'
import UltimasPublicaciones from '../components/Publicaciones'

import UserRegi from '../components/UserRegi'
import DetallesOfer from '../components/DetallesOfer'
import PublicDesact from '../components/PublicDesact'

import "../styles/Dashboard.css"
import Publicaciones from '../components/Publicaciones'



function DashboardPage() {
  return (
    <div id='bodydashboard'>
      <AsideDashboard/>
      {/* <PerfilAdmin/> */}
        <Publicaciones/>
      {/* <UserRegi/> */}
      {/* <Alerts/> */}
      {/* <PublicDesact/> */}
        {/* <DetallesOfer/>  */}
        

    </div>
  )
}

export default DashboardPage
