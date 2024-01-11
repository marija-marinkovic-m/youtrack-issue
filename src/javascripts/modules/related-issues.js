import React from 'react'

import styled from 'styled-components'
import { IconButton } from '@zendeskgarden/react-buttons'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { LG } from '@zendeskgarden/react-typography'
import { ReactComponent as ReloadIcon } from '@zendeskgarden/svg-icons/src/12/reload-stroke.svg'

import IssueCard from '../components/issue-card'
import { StyledSpacer } from '../components/common'
import useRelatedIssues from '../lib/useRelatedIssues'
import I18n from '../lib/i18n'

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
        {I18n.t('common.related_issue')}
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
