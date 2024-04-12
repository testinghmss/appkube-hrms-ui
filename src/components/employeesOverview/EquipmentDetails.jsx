
import React, { useEffect, useState } from 'react'
import EquipmentCard from './EquipmentCard'
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import { useSelector } from 'react-redux';
// import axios from '@/api/axios'

const EquipmentDetails = () => {
 
  return (
    <div className='flex flex-wrap gap-5 p-4'> 
        <EquipmentCard/>
      
    </div>
  )
}

export default EquipmentDetails