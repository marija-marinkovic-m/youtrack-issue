import React from 'react'

import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input, Textarea } from '@zendeskgarden/react-forms'
import { ButtonDots, StyledSpacer } from '../components/common'
import useIssueForm from '../lib/useIssueForm'

const IssueFields = ({ handleResize, textAreaRef }) => {
  const {
    subject,
    description,
    loading,
    setSubject,
    setDescription,
    handleSubmit
  } = useIssueForm()

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
                handleResize()
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
            Submit {loading && <ButtonDots size={16} />}
          </Button>
        </Col>
      </Row>
      <StyledSpacer />
    </Grid>
  )
}

export default IssueFields
