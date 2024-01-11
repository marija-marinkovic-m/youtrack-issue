import React from 'react'
import useYouTrack from '../lib/useYouTrack'
import { useAppData } from '../lib/app-data-context'
import useProjectInfo from './useProjectInfo'

const useRelatedIssues = () => {
  const [issues, setIssues] = React.useState([])

  const { ticket, settings } = useAppData()
  const { project } = useProjectInfo()

  const { fetchRelated } = useYouTrack({
    apiUrl: settings?.youtrackUrl,
    id: ticket?.id,
    subdomain: settings?.subdomain
  })

  const handdleFetchRelated = () => {
    fetchRelated({
      id: ticket?.id,
      projectName: project?.name
    })
      .then((response) => setIssues(response.responseJSON))
      .catch(() => setIssues([]))
  }

  React.useEffect(() => {
    if (!project?.name) return

    handdleFetchRelated()
  }, [project?.name])

  return {
    issues,
    handdleFetchRelated
  }
}

export default useRelatedIssues
