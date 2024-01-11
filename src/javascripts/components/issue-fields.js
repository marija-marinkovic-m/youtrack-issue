import React from 'react'

import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input, Textarea } from '@zendeskgarden/react-forms'
import { ReactComponent as PencilIcon } from '@zendeskgarden/svg-icons/src/12/pencil-stroke.svg'
import styled from 'styled-components'
import { ButtonDots, StyledSpacer } from '../components/common'
import useIssueForm from '../lib/useIssueForm'
import I18n from '../lib/i18n'

const StyledPenIcon = styled(PencilIcon)`
  margin-right: ${(props) => props.theme.space.xs};
`

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
