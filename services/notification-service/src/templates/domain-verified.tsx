import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle, highlightStyle } from './layout';

interface DomainVerifiedProps {
  agencyName: string;
  domain: string;
  dashboardUrl: string;
}

export function DomainVerifiedEmail({ agencyName, domain, dashboardUrl }: DomainVerifiedProps) {
  return (
    <EmailLayout preview={`Your domain ${domain} is now active!`}>
      <Heading style={headingStyle}>Domain connected!</Heading>
      <Text style={textStyle}>
        Great news, {agencyName}! Your custom domain{' '}
        <span style={highlightStyle}>{domain}</span> is now live with SSL
        enabled. Your visitors can access your travel website at{' '}
        <span style={highlightStyle}>https://{domain}</span>.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={`https://${domain}`} style={ctaStyle}>
          Visit Your Site
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default DomainVerifiedEmail;
