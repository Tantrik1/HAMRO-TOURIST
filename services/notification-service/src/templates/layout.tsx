import * as React from 'react';
import { Body, Container, Head, Hr, Html, Preview, Text } from '@react-email/components';

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#0A0A0F',
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  margin: 0,
  padding: 0,
};

const containerStyle: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 20px',
};

const footerStyle: React.CSSProperties = {
  color: '#5C5C78',
  fontSize: '13px',
  lineHeight: '1.5',
};

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {children}
          <Hr style={{ borderColor: '#2A2A3A', margin: '32px 0' }} />
          <Text style={footerStyle}>
            Hamro Tourist &middot; hamrotourist.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const headingStyle: React.CSSProperties = {
  color: '#F1F0FF',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '0 0 16px',
};

export const textStyle: React.CSSProperties = {
  color: '#9B9BB8',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

export const ctaStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
  color: '#fff',
  borderRadius: '999px',
  padding: '14px 28px',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
};

export const highlightStyle: React.CSSProperties = {
  color: '#7C3AED',
  fontWeight: '600',
};
