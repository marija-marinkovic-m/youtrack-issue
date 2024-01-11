import React from 'react'
import { useAppData } from './app-data-context'
import useYouTrack from './useYouTrack'

const useProjectInfo = () => {
  const [project, setProject] = React.useState(null)
  const { ticket, settings } = useAppData()
  const { fetchProject } = useYouTrack({
    apiUrl: settings?.youtrackUrl,
    id: ticket?.id,
    subdomain: settings?.subdomain
  })

  React.useEffect(() => {
    fetchProject({
      projectId: settings?.youtrackProject
    })
      .then((response) => setProject({
        ...response.responseJSON,
        url: `https://${settings?.youtrackUrl}/projects/${response.responseJSON.shortName}`
      }))
      .catch(() => setProject(null))
  }, [])

  return {
    project
  }
}

export default useProjectInfo
