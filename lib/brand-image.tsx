/** Shared JSX for generated icon / OG / splash images */
export function BrandImage({ label }: { label: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #4c1d95 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ fontSize: label.length > 4 ? 72 : 120, fontWeight: 800, letterSpacing: 4 }}>
        {label}
      </div>
      {label === 'S' ? null : (
        <div style={{ fontSize: 36, fontWeight: 600, marginTop: 16, opacity: 0.9 }}>
          Mystic Crate
        </div>
      )}
    </div>
  )
}
