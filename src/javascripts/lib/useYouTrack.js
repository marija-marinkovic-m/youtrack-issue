import { useAppData } from './app-data-context'

const API_ENDPOINTS = {
  issues: 'api/issues',
  projects: 'api/admin/projects'
}

const useYouTrack = ({ apiUrl, id, subdomain }) => {
  const {client} = useAppData()

  const getOptions = ({ method, path }) => ({
    url: `https://${apiUrl}/${path || ''}`,
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
    fetchRelated ({ id, projectName }) {
      const zendeskUrl = `${subdomain}.zendesk.com/agent/tickets/${id}`;
      const query = encodeURIComponent(`project: {${projectName}} {${zendeskUrl}}`)

      const path = `${API_ENDPOINTS.issues}?fields=summary,created,idReadable,updated,updater(fullName),resolved&query=${query}`

      console.log('path', path)

      return client.request(getOptions({ method: 'GET', path }))
    },
    fetchProject ({projectId}) {
        return client.request(getOptions({ method: 'GET', path: `${API_ENDPOINTS.projects}/${projectId}?fields=id,name,description,shortName` }))
    },
    create ({ summary, description, projectId }) {
      const options = {
        ...getOptions({ method: 'POST', path: `${API_ENDPOINTS.issues}?fields=idReadable` }), data: JSON.stringify({
            summary,
            description,
            project: { id: projectId },
            customFields: [{
                value: id,
                name: 'Zendesk Ticket IDs',
                id: '204-1',
                '$type': 'SimpleIssueCustomField'
            }]
        })
      }

      console.log('options', options)
      return client.request(options)
    }
  }
}

export default useYouTrack
