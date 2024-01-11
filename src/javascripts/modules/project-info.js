import React from 'react'
import { Alert, Title } from '@zendeskgarden/react-notifications'
import { MD as Medium } from '@zendeskgarden/react-typography'

import useProjectInfo from '../lib/useProjectInfo'

const ProjectInfo = () => {
  const { project } = useProjectInfo()

  if (!project) {
    return null
  }

  return (
    <Alert type='info'>
      {project.url && <a href={project.url} target='_blank' rel='noreferrer'><Title>Project: {project.name}</Title></a>}

      <Medium>{project.description ?? 'No description'}</Medium>
    </Alert>
  )
}

export default ProjectInfo
