import React from "react";
import { useAppData } from "./app-data-context";
import useYouTrack from "./useYouTrack";

const useProjectInfo = () => {
  const [project, setProject] = React.useState(null);
  const {ticket, settings} = useAppData();

  const { fetchProject } = useYouTrack({
    apiUrl: settings?.youtrackUrl,
    id: ticket?.id,
    subdomain: settings?.subdomain
  });

  React.useEffect(() => {
    console.log('fetch project useEffect')
    fetchProject({
      projectId: settings?.youtrackProject
    }).then((response) => {
      console.log('response', response)
      setProject({
        ...response.responseJSON,
        url: `https://${settings?.youtrackUrl}/project/${response.responseJSON.shortName}`
      });
    }).catch((error) => {
      console.log('error', error);
      setProject(null);
    });
  }, []);

  return {
    project
  };
}

export default useProjectInfo;