import React from 'react';
import { Title } from '@zendeskgarden/react-notifications';
import { SM } from '@zendeskgarden/react-typography';
import { StyledSpacer, Card } from './common';
import { useAppData } from '../lib/app-data-context';

const IssueCard = ({ issue }) => {
  const {settings} = useAppData()

  if (!issue || !settings) {
    return null
  }

  const issueLink = `//${settings?.youtrackUrl}/issue/${issue.idReadable}`

  return (
    <>
      <Card isRecessed>
        <Title><a href={issueLink} target='_blank'>{issue.summary}</a></Title>
        <SM>Status: {issue.resolved ? 'Resolved' : 'Open'}</SM>
        <SM>Created: {new Date(issue.created).toLocaleString()}</SM>
        {issue.updated && <SM>Last updated: {new Date(issue.updated).toLocaleString()}</SM>}
      </Card>
      <StyledSpacer />
    </>
  );
}

export default IssueCard;