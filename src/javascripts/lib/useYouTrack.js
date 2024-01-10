import { useClient } from './client-context'

const API_ENDPOINTS = {
  issues: 'api/issues'
}

const useYouTrack = ({ apiUrl }) => {
  const client = useClient()

  const getOptions = ({ method, path }) => ({
    url: `https://${apiUrl}/${API_ENDPOINTS.issues}${path || ''}`,
    type: method || 'GET',
    headers: {
      Authorization: 'Bearer {{setting.apiToken}}',
      'Content-Type': 'application/json'
    },
    cache: false,
    contentType: 'application/json',
    dataType: 'json',
    secure: true,
    httpCompleteResponse: true
  })

  return {
    fetch ({ id }) {
      return client.request(getOptions({ method: 'GET', path: `/${id}?fields=id,summary,customFields(id,name,value(avatarUrl,buildLink,color(id),fullName,id,isResolved,localizedName,login,minutes,name,presentation,text))` }))
    },
    create ({ summary, description, projectId }) {
      const options = {
        ...getOptions({ method: 'POST', path: '?fields=idReadable' }), data: JSON.stringify({ summary, description, project: { id: projectId } })
      }

      console.log('options', options)
      return client.request(options)
    }
  }
}

export default useYouTrack
