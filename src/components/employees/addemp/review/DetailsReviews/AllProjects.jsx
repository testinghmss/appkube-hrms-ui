import React from 'react'
import ProjectsCard from './ProjectsCard'

const AllProjects = ({empData}) => {
  console.log('datra from props',empData)
  return (
    <div className='flex flex-wrap gap-6 p-2'>
      <ProjectsCard/>
      <ProjectsCard/>
      <ProjectsCard/>
      <ProjectsCard/>
      <ProjectsCard/>
      <ProjectsCard/>
    </div>
  )
}

export default AllProjects