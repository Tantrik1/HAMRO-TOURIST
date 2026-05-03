import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle, highlightStyle } from './layout';

interface NewLeadProps {
  agencyName: string;
  leadName: string;
  leadEmail: string;
  message: string;
  dashboardUrl: string;
}

export function NewLeadEmail({ agencyName, leadName, leadEmail, message, dashboardUrl }: NewLeadProps) {
  return (
    <EmailLayout preview={`New inquiry from ${leadName}`}>
      <Heading style={headingStyle}>New lead received!</Heading>
      <Text style={textStyle}>
        Hi {agencyName}, someone just submitted a contact form on your website.
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
        <Text style={{ color: '#F1F0FF', fontSize: '14px', margin: '0 0 8px' }}>
          <span style={highlightStyle}>Name:</span> {leadName}
        </Text>
        <Text style={{ color: '#F1F0FF', fontSize: '14px', margin: '0 0 8px' }}>
          <span style={highlightStyle}>Email:</span> {leadEmail}
        </Text>
        <Text style={{ color: '#9B9BB8', fontSize: '14px', margin: 0 }}>
          {message}
        </Text>
      </Section>
      <Section style={{ marginTop: '24px' }}>
        <Button href={dashboardUrl} style={ctaStyle}>
          View in CRM
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default NewLeadEmail;
