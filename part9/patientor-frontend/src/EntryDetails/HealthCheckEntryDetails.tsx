import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry}> = ({ entry }): JSX.Element => {
  const iconColor = {
    [HealthCheckRating.Healthy]: "green",
    [HealthCheckRating.LowRisk]: "yellow",
    [HealthCheckRating.HighRisk]: "orange",
    [HealthCheckRating.CriticalRisk]: "red"
  }[entry.healthCheckRating] as SemanticCOLORS;

  return (
    <Segment>
      <Header as="h5">{entry.date}<Icon name="user md" /></Header>
      <p><em>{entry.description}</em></p>
      <Icon name="heart" color={iconColor} />
    </Segment>
  );
};

export default HealthCheckEntryDetails;
