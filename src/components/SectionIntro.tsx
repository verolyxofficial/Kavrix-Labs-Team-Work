export default function SectionIntro({ kicker, title, accent, copy }: { kicker: string; title: string; accent?: string; copy: string }) {
  return (
    <div className="section-intro reveal">
      <div>
        <span className="eyebrow">{kicker}</span>
        <h2>{title}{accent && <> <em>{accent}</em></>}</h2>
      </div>
      <p>{copy}</p>
    </div>
  );
}
