import React from 'react'

import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Alert, Title } from '@zendeskgarden/react-notifications'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input, Textarea } from '@zendeskgarden/react-forms'
import { ReactComponent as PencilIcon } from '@zendeskgarden/svg-icons/src/12/pencil-stroke.svg'
import styled from 'styled-components'
import { ButtonDots, StyledSpacer } from '../components/common'
import useIssueForm from '../lib/useIssueForm'
import I18n from '../lib/i18n'
import IssueCard from './issue-card'

const StyledPenIcon = styled(PencilIcon)`
  margin-right: ${(props) => props.theme.space.xs};
`

const IssueFields = () => {
  const {
    subject,
    description,
    loading,
    error,
    success,
    setSubject,
    setDescription,
    handleSubmit
  } = useIssueForm()

  const textAreaRef = React.useRef(null)

  const autoResizeTextArea = () => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }

  React.useEffect(() => {
    autoResizeTextArea()
  }, [])

  if (error) {
    return (
      <Alert type='error'>
        <Title>{I18n.t('default.error_issue_create')}</Title>
        {I18n.t('default.error_500')}
      </Alert>
    )
  }

  if (success) {
    return <IssueCard issue={success} />
  }

  return (
    <Grid gutters={false}>
      <Row justifyContent='center'>
        <Col>
          <Field>
            <Label>
              <StyledPenIcon />
              {I18n.t('common.subject')}
            </Label>
            <Input name='subject' onChange={(e) => setSubject(e.target.value)} value={subject} disabled={loading} isBare />
          </Field>
        </Col>
      </Row>
      <StyledSpacer />
      <Row>
        <Col>
          <Field>
            <Label>
              <StyledPenIcon />
              {I18n.t('common.description')}
            </Label>
            <Textarea
              ref={textAreaRef}
              name='description'
              onChange={(e) => {
                setDescription(e.target.value)
                autoResizeTextArea()
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
          <Button
            size='small'
            isPrimary disabled={loading} onClick={handleSubmit}
          >
            {I18n.t('common.submit')}
            {loading && <ButtonDots size={16} />}
          </Button>
        </Col>
      </Row>
      <StyledSpacer />
    </Grid>
  )
}

export default IssueFields
