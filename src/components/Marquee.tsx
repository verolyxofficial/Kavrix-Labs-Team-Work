export default function Marquee() {
  const words = ["VIDEO", "MOTION", "BRAND", "UI/UX", "SOCIAL", "FRONT-END", "EMAIL", "E-COMMERCE"];
  const repeated = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {repeated.map((word, index) => (
          <span key={`${word}-${index}`}>{word}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
