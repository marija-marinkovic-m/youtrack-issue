import React from 'react'

const ClientContext = React.createContext(null)

const ClientContextProvider = ({ children, client }) => {
  return /* #__PURE__ */React.createElement(ClientContext.Provider, {
    value: client
  }, children)
}

const useClient = () => {
  const client = React.useContext(ClientContext)

  if (!client) {
    throw new Error('useClient must be used within a ClientContextProvider')
  }

  return client
}

const useSettings = () => {
  const client = useClient()
  const [settings, setSettings] = React.useState(null)
  React.useEffect(() => {
    client.metadata().then(function (metadata) {
      setSettings(metadata.settings)
    })
  }, [client])
  return settings
}

export { useClient, useSettings, ClientContextProvider }
