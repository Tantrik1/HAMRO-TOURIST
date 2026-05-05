import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Hamro Tourist — The AI platform for travel agencies';
export const size = { width: 1200, height: 630 };

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8f7ff 0%, #fff8f0 100%)',
          padding: 60,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 160,
            height: 160,
            borderRadius: 32,
            background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
            marginBottom: 40,
            boxShadow: '0 24px 60px rgba(124,58,237,0.25)',
          }}
        >
          {/* Mountain icon inside logo circle */}
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M6 18l6-10.5 6 10.5H6z" fill="white" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#1a1a2e',
            letterSpacing: '-0.02em',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Hamro Tourist
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#6b6b8a',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          The AI platform built for travel agencies
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            color: '#9b9bb8',
          }}
        >
          <span>Website</span>
          <span style={{ color: '#d1d1e0' }}>·</span>
          <span>CRM</span>
          <span style={{ color: '#d1d1e0' }}>·</span>
          <span>Payments</span>
          <span style={{ color: '#d1d1e0' }}>·</span>
          <span>AI</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
