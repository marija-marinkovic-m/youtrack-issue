import React from 'react'
import { Alert, Title } from '@zendeskgarden/react-notifications'
import { MD as Medium } from '@zendeskgarden/react-typography'

import I18n from '../lib/i18n'
import useProjectInfo from '../lib/useProjectInfo'

const ProjectInfo = () => {
  const { project } = useProjectInfo()

  if (!project) {
    return null
  }

  return (
    <Alert type='info'>
      {project.url && <a href={project.url} target='_blank' rel='noreferrer'><Title>{project.name}</Title></a>}

      <Medium>{project.description ?? I18n.t('common.no_description')}</Medium>
    </Alert>
  )
}

export default ProjectInfo
