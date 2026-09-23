import { ArrowUpRight } from "lucide-react";
import { getConnectMethods } from "../utils/connect";

export default function ConnectCard() {
  const methods = getConnectMethods();

  return (
    <article className="connect-project-card reveal" aria-label="Connect with Kavrix Labs">
      <div className="connect-project-copy">
        <div className="project-meta"><span>Connect</span><span>Direct links</span></div>
        <h3>Find Kavrix wherever you already spend your screen time.</h3>
        <p>Choose the channel that suits you. Social platforms, messaging, video, and a direct call request now live together in one clear place.</p>
      </div>
      <div className="connect-project-grid">
        {methods.map((method) => (
          <a
            key={method.name}
            className="connect-button"
            href={method.url}
            target={method.url.startsWith("http") ? "_blank" : undefined}
            rel={method.url.startsWith("http") ? "noreferrer" : undefined}
          >
            <span className="connect-icon">{method.icon}</span>
            <span>{method.name}</span>
            <ArrowUpRight />
          </a>
        ))}
      </div>
    </article>
  );
}
