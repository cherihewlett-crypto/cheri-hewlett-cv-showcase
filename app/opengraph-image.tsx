import { ImageResponse } from 'next/og';

/**
 * The social/README preview is a compact visual model of how Cheri works:
 * judgment turns a meaningful problem into a governed system whose impact can
 * be proved. It intentionally avoids metrics so the image stays durable.
 */
export const alt =
  'Cheri Hewlett operating model: frame the problem, apply judgment, build the system, govern and verify, scale human impact';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const stages = [
  ['01', 'Frame the problem', 'Choose what matters'],
  ['02', 'Apply judgment', 'Domain + evidence'],
  ['03', 'Build the system', 'People + technology'],
  ['04', 'Govern + verify', 'Authority + proof'],
  ['05', 'Scale the impact', 'Measurable value'],
] as const;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '54px 68px 46px',
          background:
            'radial-gradient(circle at 84% 8%, rgba(23,179,199,.18), transparent 36%), linear-gradient(135deg, #03121b 0%, #07232f 100%)',
          color: '#f2f9fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #143a4b',
            paddingBottom: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            CHERI HEWLETT
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              letterSpacing: 2.4,
              color: '#17b3c7',
              textTransform: 'uppercase',
            }}
          >
            Technology · innovation · governance
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 790,
              flexDirection: 'column',
              fontSize: 45,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            <div style={{ display: 'flex' }}>Choose the problem. Build the system.</div>
            <div style={{ display: 'flex', color: '#45e0b8' }}>Prove the impact.</div>
          </div>
          <div
            style={{
              display: 'flex',
              width: 238,
              marginLeft: 36,
              paddingBottom: 5,
              fontSize: 17,
              lineHeight: 1.35,
              color: '#9ec6d2',
            }}
          >
            A governed path from expertise to measurable value.
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginTop: 44,
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              left: 48,
              right: 48,
              top: 25,
              height: 2,
              background: 'linear-gradient(90deg, #17b3c7 0%, #17b3c7 72%, #45e0b8 100%)',
            }}
          />

          {stages.map(([number, title, detail], index) => (
            <div
              key={number}
              style={{
                position: 'relative',
                display: 'flex',
                width: '19%',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  border: `2px solid ${index === stages.length - 1 ? '#45e0b8' : '#17b3c7'}`,
                  background: index === stages.length - 1 ? '#45e0b8' : '#04141e',
                  color: index === stages.length - 1 ? '#04141e' : '#17b3c7',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {number}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 16,
                  fontSize: 19,
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 7,
                  fontSize: 14,
                  letterSpacing: 0.4,
                  color: '#9ec6d2',
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 18,
            borderTop: '1px solid #143a4b',
            color: '#5f8592',
            fontSize: 13,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
          }}
        >
          <span>People first</span>
          <span>Challenge the status quo</span>
          <span>Diverse perspectives</span>
          <span style={{ color: '#45e0b8' }}>Human always</span>
        </div>
      </div>
    ),
    size,
  );
}
