import React from 'react'

import { Alert, Title } from '@zendeskgarden/react-notifications'
import IssueCard from '../components/issue-card'
import useRelatedIssues from '../lib/useRelatedIssues'
import useIssueForm from '../lib/useIssueForm'
import IssueFields from '../components/issue-fields'

const IssueForm = () => {
  const { issues } = useRelatedIssues()
  const { error, success } = useIssueForm()

  const textAreaRef = React.useRef(null)

  const autoResizeTextArea = () => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }

  React.useEffect(() => {
    autoResizeTextArea()
  }, [])

  if (issues.length > 0) {
    return null
  }

  if (error) {
    return (
      <Alert type='error'>
        <Title>{error.error ?? 'Issue could not be created'}</Title>
        {error.error_description ?? 'Something went wrong'}
      </Alert>
    )
  }

  if (success) {
    return <IssueCard issue={success} />
  }

  return (
    <IssueFields
      handleResize={autoResizeTextArea}
      textAreaRef={textAreaRef}
    />
  )
}

export default IssueForm
