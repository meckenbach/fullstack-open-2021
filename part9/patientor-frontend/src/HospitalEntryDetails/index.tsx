import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry}> = ({ entry }): JSX.Element => {
  return (
    <Segment>
      <Header as="h5">{entry.date}<Icon name="hospital" /></Header>
      <p><em>{entry.description}</em></p>
    </Segment>
  );
};

export default HospitalEntryDetails;
