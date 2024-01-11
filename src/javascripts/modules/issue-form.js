import React from 'react'

import useRelatedIssues from '../lib/useRelatedIssues'
import IssueFields from '../components/issue-fields'

const IssueForm = () => {
  const { issues } = useRelatedIssues()

  if (issues.length > 0) {
    return null
  }

  return (
    <IssueFields />
  )
}

export default IssueForm
