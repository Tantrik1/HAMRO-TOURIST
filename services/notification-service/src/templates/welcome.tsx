import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle } from './layout';

interface WelcomeEmailProps {
  agencyName: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ agencyName, dashboardUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout preview={`Welcome to Hamro Tourist — your agency website awaits`}>
      <Heading style={headingStyle}>Welcome, {agencyName}!</Heading>
      <Text style={textStyle}>
        Your Hamro Tourist account is ready. Start building your travel agency
        website in minutes — choose a theme, add your tours, and publish.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={dashboardUrl} style={ctaStyle}>
          Open Dashboard
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default WelcomeEmail;
