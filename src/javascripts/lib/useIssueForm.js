import React from 'react'
import { useAppData } from './app-data-context'
import useYouTrack from './useYouTrack'
import { escapeSpecialChars } from './helpers'

const DESC_CHAR_LIMIT = 150

const prepareDescription = (description, url) => {
  const desc = escapeSpecialChars(description.replace(/<\/?[^>]+(>|$)/g, ''))

  const truncatedDescription = desc.length > DESC_CHAR_LIMIT ? `${desc.substring(0, DESC_CHAR_LIMIT)}...` : desc

  return `**Extract of Information**\n${truncatedDescription}\n\n---\n\n**Zendesk URL**\n${url}`
}

const useIssueForm = () => {
  const { ticket, settings } = useAppData()

  const [subject, setSubject] = React.useState(ticket?.subject)
  const [description, setDescription] = React.useState(
    prepareDescription(ticket?.description,
      settings?.subdomain ? `https://${settings?.subdomain}.zendesk.com/agent/tickets/${ticket?.id}` : ''
    ))
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const { create } = useYouTrack({
    apiUrl: settings?.youtrackUrl,
    id: ticket?.id,
    subdomain: settings?.subdomain
  })

  const handleSubmit = () => {
    setLoading(true)

    create({
      summary: subject,
      description,
      projectId: settings?.youtrackProject
    })
      .then((response) => setSuccess(response.responseJSON))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return {
    subject,
    setSubject,
    description,
    setDescription,
    loading,
    error,
    success,
    handleSubmit
  }
}

export default useIssueForm
