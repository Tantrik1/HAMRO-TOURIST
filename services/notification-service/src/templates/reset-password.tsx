import * as React from 'react';
import { Heading, Text, Section, Button } from '@react-email/components';
import { EmailLayout, headingStyle, textStyle, ctaStyle } from './layout';

interface ResetPasswordProps {
  resetUrl: string;
  expiresIn: string;
}

export function ResetPasswordEmail({ resetUrl, expiresIn }: ResetPasswordProps) {
  return (
    <EmailLayout preview="Reset your password">
      <Heading style={headingStyle}>Reset your password</Heading>
      <Text style={textStyle}>
        We received a request to reset your password. Click below to choose a
        new one. This link expires in {expiresIn}.
      </Text>
      <Section style={{ marginTop: '24px' }}>
        <Button href={resetUrl} style={ctaStyle}>
          Reset Password
        </Button>
      </Section>
      <Text style={{ ...textStyle, fontSize: '13px', marginTop: '24px' }}>
        If you didn't request this, you can safely ignore this email. Your
        password won't change.
      </Text>
    </EmailLayout>
  );
}

export default ResetPasswordEmail;
