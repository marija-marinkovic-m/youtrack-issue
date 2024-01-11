import React from 'react'
import { Title } from '@zendeskgarden/react-notifications'
import { SM as Small } from '@zendeskgarden/react-typography'
import { StyledSpacer, Card } from './common'
import { useAppData } from '../lib/app-data-context'

const IssueCard = ({ issue }) => {
  const { settings } = useAppData()

  if (!issue || !settings) {
    return null
  }

  const issueLink = `//${settings?.youtrackUrl}/issue/${issue.idReadable}`

  return (
    <>
      <Card isRecessed>
        <Title><a href={issueLink} target='_blank' rel='noreferrer'>{issue.summary}</a></Title>
        <Small>Status: {issue.resolved ? 'Resolved' : 'Open'}</Small>
        <Small>Created: {new Date(issue.created).toLocaleString()}</Small>
        {issue.updated && <Small>Last updated: {new Date(issue.updated).toLocaleString()}</Small>}
      </Card>
      <StyledSpacer />
    </>
  )
}

export default IssueCard
