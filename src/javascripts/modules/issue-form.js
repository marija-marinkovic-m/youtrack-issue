import React from 'react'

import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'

import { Field, Label, Input, Textarea } from '@zendeskgarden/react-forms'
import { ButtonDots, StyledSpacer } from '../components/common'
import useYouTrack from "../lib/useYouTrack";
import { useAppData } from '../lib/app-data-context';
import { escapeSpecialChars } from '../lib/helpers'

const DESC_CHAR_LIMIT = 150;

const prepareDescription = (description, url) => {
  const desc = escapeSpecialChars(description.replace(/<\/?[^>]+(>|$)/g, ""));

  const truncatedDescription = desc.length > DESC_CHAR_LIMIT ? `${desc.substring(0, DESC_CHAR_LIMIT)}...` : desc;

  return `**Detail**\n${truncatedDescription}\n\n**Zendesk URL**\n${url}`;
}

const IssueForm = () => {
  const {ticket, settings} = useAppData()
  const ticketUrl = settings?.subdomain ? `https://${settings?.subdomain}.zendesk.com/agent/tickets/${ticket?.id}` : '';

  const [subject, setSubject] = React.useState(ticket?.subject)
  const [description, setDescription] = React.useState(prepareDescription(ticket?.description, ticketUrl))

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const textAreaRef = React.useRef(null);

  const autoResizeTextArea = () => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  React.useEffect(() => {
    autoResizeTextArea();
  }, []);

  const { create } = useYouTrack({
    apiUrl: settings?.youtrackUrl,
    id: ticket?.id,
    subdomain: settings?.subdomain
  })

  if (error) {
    return <div>Error: <pre>{JSON.stringify(error, null, 2)}</pre></div>
  }

  if (success) {
    return <div>Success: <pre>{JSON.stringify(success, null, 2)}</pre></div>
  }

  const handleSubmit = () => {
    setLoading(true)
    create({
      summary: subject,
      description,
      projectId: settings?.youtrackProject
    }).then((response) => {
      console.log('response', response)
      setSuccess(response)
    }).catch((error) => {
      console.log('error', error)
      setError(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Grid gutters={false}>
      <Row justifyContent='center'>
        <Col>
          <Field>
            <Label>Subject</Label>
            <Input name='subject' onChange={(e) => setSubject(e.target.value)} value={subject} disabled={loading} isBare />
          </Field>
        </Col>
      </Row>
      <StyledSpacer />
      <Row>
        <Col>
          <Field>
            <Label>Description</Label>
            <Textarea
              ref={textAreaRef}
              name='description'
              onChange={(e) => {
                setDescription(e.target.value)
                autoResizeTextArea();
              }} 
              value={description} 
              disabled={loading} 
              isCompact 
              isBare 
            />
          </Field>
        </Col>
      </Row>
      <StyledSpacer />

      <Row>
        <Col textAlign='end'>
          <Button size='small'
            isPrimary disabled={loading} onClick={handleSubmit}
          >
            Submit {loading && <ButtonDots size={16} />}
          </Button>
        </Col>
      </Row>
      <StyledSpacer />
    </Grid>
  );
}

export default IssueForm
