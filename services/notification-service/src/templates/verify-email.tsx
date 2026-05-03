import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle } from './layout';

interface VerifyEmailProps {
  verifyUrl: string;
  expiresIn: string;
}

export function VerifyEmail({ verifyUrl, expiresIn }: VerifyEmailProps) {
  return (
    <EmailLayout preview="Verify your email address">
      <Heading style={headingStyle}>Verify your email</Heading>
      <Text style={textStyle}>
        Click the button below to verify your email address. This link expires
        in {expiresIn}.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={verifyUrl} style={ctaStyle}>
          Verify Email
        </Button>
      </Section>
      <Text style={{ ...textStyle, fontSize: '13px', marginTop: '24px' }}>
        If you didn't create an account, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}

export default VerifyEmail;
