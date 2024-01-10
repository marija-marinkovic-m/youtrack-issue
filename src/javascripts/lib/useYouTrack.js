import { useClient } from "./client-context";

const API_ENDPOINTS = {
    issues: 'api/issues',
}

const useYouTrack = ({apiUrl}) => {
    const client = useClient();
    
    const getOptions = ({method, path}) => ({
        url: `https://${apiUrl}/${API_ENDPOINTS.issues}${path || ''}`,
        method: method || 'GET',
        headers: {
            Authorization: 'Bearer {{setting.apiToken}}',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        contentType: 'application/json',
        secure: true,
        redirect: 'follow',
    });

    return {
        fetch({id}) {
            return client.request(getOptions({method: 'GET', path: `/${id}?fields=id,summary,customFields(id,name,value(avatarUrl,buildLink,color(id),fullName,id,isResolved,localizedName,login,minutes,name,presentation,text))`}));
        },
        create({summary, description, projectId}) {
            return client.request({...getOptions({method: 'POST', path: '?fields=idReadable'}), data: JSON.stringify({summary, description, project: {id: projectId}})});
        }
    };
}

export default useYouTrack;