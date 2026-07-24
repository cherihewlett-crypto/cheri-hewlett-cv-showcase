import { ImageResponse } from 'next/og';

/**
 * The social preview card — the image that renders when the link is pasted
 * into LinkedIn, X, Slack, or a message. Without it the link shows as bare
 * text and reads as unfinished. Generated at build time from the brand
 * palette; the same file also serves the X/Twitter card via metadata.
 */
export const alt = 'Cheri Hewlett — Technology & innovation executive, builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #04141e 0%, #0a2634 100%)',
          color: '#f2f9fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#17b3c7', textTransform: 'uppercase' }}>
          Cheri Hewlett · Technology &amp; innovation executive
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
          <div style={{ display: 'flex' }}>From problem to solution</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>through technology —</span>
            <span style={{ color: '#17b3c7' }}>the right</span>
          </div>
          <div style={{ display: 'flex', color: '#17b3c7' }}>solution for the problems</div>
          <div style={{ display: 'flex' }}>that return real value.</div>
        </div>

        <div style={{ display: 'flex', gap: 44, fontSize: 26, color: '#9ec6d2' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#f2f9fa', fontWeight: 700 }}>6,912</span>
            <span>commits</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#f2f9fa', fontWeight: 700 }}>302</span>
            <span>capabilities</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#f2f9fa', fontWeight: 700 }}>4</span>
            <span>production systems</span>
          </div>
          <div style={{ display: 'flex', color: '#45e0b8' }}>verified, not typed</div>
        </div>
      </div>
    ),
    size,
  );
}
