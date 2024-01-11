import React from 'react'

const AppDataContext = React.createContext(null)

const AppDataContextProvider = ({ children, settings, ticket, client }) => {
  return (
    <AppDataContext.Provider value={{ settings, ticket, client }}>
      {children}
    </AppDataContext.Provider>
  )
}

const useAppData = () => {
  const appData = React.useContext(AppDataContext)

  if (!appData) {
    throw new Error('useAppData must be used within a AppDataContextProvider')
  }

  return appData
}

export { useAppData, AppDataContextProvider }
