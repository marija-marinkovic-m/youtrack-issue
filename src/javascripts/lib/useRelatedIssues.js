import React from 'react'
import useYouTrack from '../lib/useYouTrack'
import { useAppData } from '../lib/app-data-context'
import useProjectInfo from './useProjectInfo'

const useRelatedIssues = () => {
  const [issues, setIssues] = React.useState([])
  const [isCalled, setIsCalled] = React.useState(false)

  const { ticket, settings } = useAppData()
  const { project } = useProjectInfo()

  const { fetchRelated } = useYouTrack({
    apiUrl: settings?.youtrackUrl,
    id: ticket?.id,
    subdomain: settings?.subdomain
  })

  const handdleFetchRelated = () => {
    console.log('handleFetch')
    fetchRelated({
      id: ticket?.id,
      projectName: project?.name
    }).then((response) => {
      console.log('response', response)
      setIssues(response.responseJSON)
    }).catch((error) => {
      console.log('error', error)
      setIssues([])
    })
  }

  React.useEffect(() => {
    if (!project?.name || isCalled) return

    setIsCalled(true)
    console.log('fetch related useEffect')
    handdleFetchRelated()
  }, [project?.name, isCalled])

  return {
    issues,
    handdleFetchRelated
  }
}

export default useRelatedIssues
