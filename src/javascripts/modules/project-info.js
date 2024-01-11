import React from "react";
import { Alert, Title, Close } from '@zendeskgarden/react-notifications';
import { MD } from '@zendeskgarden/react-typography';

import useProjectInfo from "../lib/useProjectInfo";

const ProjectInfo = () => {
  const {project} = useProjectInfo()

  if (!project) {
    return null;
  }

  return (
    <Alert type="info">
      {project && <a href={project.url} target="_blank"><Title>Project: {project.name}</Title></a>}

      <MD>{project.description ?? 'No description'}</MD>
      <Close aria-label="Close Alert" />
    </Alert>
  );
}

export default ProjectInfo;