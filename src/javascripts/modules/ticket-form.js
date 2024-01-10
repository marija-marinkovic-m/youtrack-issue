import React from "react";
import { Col, Grid, Row } from "@zendeskgarden/react-grid";
import { Button } from "@zendeskgarden/react-buttons";
import { Field, Label, Input, Textarea } from '@zendeskgarden/react-forms';
import { useSettings } from "../lib/client-context";
import useYouTrack from "../lib/useYouTrack";


const TicketForm = ({ data }) => {
  const [subject, setSubject] = React.useState(data.subject);
  const [description, setDescription] = React.useState(data.description);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const settings = useSettings();
  const { create, fetch } = useYouTrack({
    apiUrl: settings?.youtrackUrl
  });

  if (error) {
    return <div>Error: <pre>{JSON.stringify(error, null, 2)}</pre></div>;
  }

  if (success) {
    return <div>Success: <pre>{JSON.stringify(success, null, 2)}</pre></div>;
  }

  return (
    <Grid gutters={false}>
      <Row justifyContent="center">
        <Col className="field">
          <Field>
            <Label>Subject</Label>
            <Input name="subject" onChange={(e) => setSubject(e.target.value)} value={subject} />
          </Field>
        </Col>
      </Row>
      <Row>
        <Col className="field">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" onChange={(e) => setDescription(e.target.value)} value={description} />
          </Field>
        </Col>
      </Row>

      <Row>
        <Col textAlign="start">
          <Button onClick={() => {
            setSubject(data.subject);
            setDescription(data.description);
          }}>Reset</Button>
        </Col>
        <Col textAlign="center">
          <Button isBasic onClick={() => {
            fetch({ id: 'DEMO-1' }).then((response) => {
              console.log('response', response);
            }).catch((error) => {
              console.log('error', error);
            });
          }}>Fetch</Button>
        </Col>
        <Col textAlign="end">
          <Button isPrimary loading={loading} onClick={() => {
            setLoading(true);
            create({
              summary: subject,
              description,
              projectId: settings?.youtrackProject,
            }).then((response) => {
              console.log('response', response);
              setSuccess(response);
            }).catch((error) => {
              console.log('error', error);
              setError(error);
            }).finally(() => {
              setLoading(false);
            });
          }}>Create</Button>
        </Col>
      </Row>
    </Grid>
  );
}

export default TicketForm;