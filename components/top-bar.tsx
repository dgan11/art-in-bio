import GitHub from "./github";

export default function TopBar({
  info,
  grayScale
}: {
  info?: boolean;
  grayScale?: boolean;
}) {
  return (
    <div className="top-bar-container">
      <div className="logo-and-info">
        <a href="https://artin.bio">
          <h2>
            <span className="static">artin</span>
            <span className="fun">.bio</span>
          </h2>
        </a>
        {info && (
          <p>
            Build an artist landing page in under a minute. For Free. No sign up needed
          </p>
        )}
      </div>
      <div className="view-source">
        <a href="https://github.com/dgan11/art-in-bio" target="_blank">
          <div>
            <GitHub />
          </div>
        </a>
      </div>
      <style jsx>{`
        .top-bar-container {
          width: 100%;
          height: 50px;
          background: #2554C7;
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
        }
        .logo-and-info {
          display: flex;
          align-items: center;
        }
        .logo-and-info .fun {
          font-family: "Comic Sans", "Comic Sans MS", "Chalkboard",
            "ChalkboardSE-Regular", monospace;
        }
        p {
          font-weight: normal;
          font-family: Menlo, monospace;
          font-size: 12px;
          margin-left: 16px;
        }
        a {
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        .view-source {
          border-left: 1px solid white;
        }

        .view-source p {
          font-weight: bold;
          font-size: 14px;
        }

        .view-source a {
          display: flex;
          align-items: center;
        }

        .view-source * {
          margin-left: 8px;
        }
        @media (max-width: 600px) {
          p {
            font-size: 10px;
            font-weight: normal;
          }
          .logo-and-info p {
            display: none;
          }
        }
      `}</style>
      <style jsx>{`
        .top-bar-container {
          filter: ${grayScale ? "grayscale(1)" : "none"};
        }
      `}</style>
    </div>
  );
}
