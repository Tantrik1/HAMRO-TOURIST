import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle, highlightStyle } from './layout';

interface PlanUpgradedProps {
  agencyName: string;
  planName: string;
  dashboardUrl: string;
}

export function PlanUpgradedEmail({ agencyName, planName, dashboardUrl }: PlanUpgradedProps) {
  return (
    <EmailLayout preview={`You've upgraded to ${planName}!`}>
      <Heading style={headingStyle}>Plan upgraded!</Heading>
      <Text style={textStyle}>
        Congrats {agencyName}! You're now on the{' '}
        <span style={highlightStyle}>{planName}</span> plan. Your new limits
        and features are active immediately.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={dashboardUrl} style={ctaStyle}>
          Explore New Features
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default PlanUpgradedEmail;
