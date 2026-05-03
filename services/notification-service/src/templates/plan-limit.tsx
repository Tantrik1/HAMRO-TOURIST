import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle, highlightStyle } from './layout';

interface PlanLimitProps {
  agencyName: string;
  resourceName: string;
  currentCount: number;
  maxAllowed: number;
  upgradeUrl: string;
}

export function PlanLimitEmail({ agencyName, resourceName, currentCount, maxAllowed, upgradeUrl }: PlanLimitProps) {
  return (
    <EmailLayout preview={`You've reached your ${resourceName} limit`}>
      <Heading style={headingStyle}>Plan limit reached</Heading>
      <Text style={textStyle}>
        Hi {agencyName}, you've used{' '}
        <span style={highlightStyle}>{currentCount}/{maxAllowed}</span>{' '}
        {resourceName} on your current plan. Upgrade to unlock more capacity.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={upgradeUrl} style={ctaStyle}>
          Upgrade Plan
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default PlanLimitEmail;
