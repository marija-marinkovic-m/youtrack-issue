import React from 'react'

import styled from 'styled-components'
import { IconButton } from '@zendeskgarden/react-buttons'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { LG } from '@zendeskgarden/react-typography'
import { ReactComponent as ReloadIcon } from '@zendeskgarden/svg-icons/src/16/reload-stroke.svg'

import IssueCard from '../components/issue-card'
import { StyledSpacer } from '../components/common'
import useRelatedIssues from '../lib/useRelatedIssues'

const StyledTitle = styled(LG)`
  display: flex;
  align-items: center;
`

const RelatedIssues = () => {
  const { issues, handdleFetchRelated } = useRelatedIssues()

  if (!issues.length) {
    return null
  }

  return (
    <>
      <StyledTitle>
        Related Issue(s)
        <Tooltip content='Reload' placement='top'>
          <IconButton onClick={handdleFetchRelated} size='small' aria-label='Reload'>
            <ReloadIcon />
          </IconButton>
        </Tooltip>
      </StyledTitle>
      <StyledSpacer />
      {issues.map((issue) => (
        <IssueCard key={`key-${issue.id}`} issue={issue} />
      ))}
    </>
  )
}

export default RelatedIssues
