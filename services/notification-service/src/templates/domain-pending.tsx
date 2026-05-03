import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle, highlightStyle } from './layout';

interface DomainPendingProps {
  agencyName: string;
  domain: string;
  cnameTarget: string;
  dashboardUrl: string;
}

export function DomainPendingEmail({ agencyName, domain, cnameTarget, dashboardUrl }: DomainPendingProps) {
  return (
    <EmailLayout preview={`Action needed: configure DNS for ${domain}`}>
      <Heading style={headingStyle}>DNS setup required</Heading>
      <Text style={textStyle}>
        Hi {agencyName}, you've submitted{' '}
        <span style={highlightStyle}>{domain}</span> as your custom domain.
        To activate it, add a CNAME record in your DNS provider:
      </Text>
      <Section
        style={{
          background: '#111118',
          border: '1px solid #2A2A3A',
          borderRadius: '12px',
          padding: '20px',
          margin: '16px 0',
        }}
      >
        <Text style={{ color: '#F1F0FF', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
          Type: CNAME{'\n'}
          Name: {domain}{'\n'}
          Target: {cnameTarget}
        </Text>
      </Section>
      <Text style={textStyle}>
        DNS changes can take up to 48 hours to propagate. We'll email you once
        verification succeeds.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={dashboardUrl} style={ctaStyle}>
          Check Status
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default DomainPendingEmail;
