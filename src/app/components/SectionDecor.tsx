export function CornerDecor({ side = 'left' }: { side?: 'left' | 'right' }) {
  const bars = [
    { top: 16, opacity: 0.06 },
    { top: 68, opacity: 0.11 },
    { top: 120, opacity: 0.17 },
  ];

  return (
    <div
      className="absolute top-0 pointer-events-none z-0 overflow-hidden"
      style={{ width: 320, height: 260, [side === 'left' ? 'left' : 'right']: 0 }}
    >
      {bars.map(({ top, opacity }, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: 460,
            height: 58,
            borderRadius: 10,
            background: `rgba(34,197,94,${opacity})`,
            transform: `rotate(${side === 'left' ? -32 : 32}deg)`,
            top,
            [side === 'left' ? 'left' : 'right']: -140,
          }}
        />
      ))}
    </div>
  );
}

export function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(34,197,94,0.09) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
      }}
    />
  );
}
