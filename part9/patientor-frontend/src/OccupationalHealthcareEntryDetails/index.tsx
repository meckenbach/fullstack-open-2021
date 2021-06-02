import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry}> = ({ entry }): JSX.Element => {
  return (
    <Segment>
      <Header as="h5">{entry.date} <Icon name="stethoscope" />{entry.employerName}</Header>
      <p><em>{entry.description}</em></p>
    </Segment>
  );
};

export default OccupationalHealthcareEntryDetails;
