const Footer: React.FC<FooterProps> = ({ time, author }) => {
  const now = new Date().getFullYear();

  return (
    <footer
      className="footer footer-center p-4 bg-base-300 text-base-content"
      aria-label="Footer"
    >
      <div>
        <p role="presentation" aria-label="copyright">
          Copyright © {time === now ? now : `${time} - ${now}`}, All right
          reserved{author ? ` by ${author}` : null}.
        </p>
      </div>
    </footer>
  );
};

interface FooterProps {
  time: number;
  author?: string;
}

export default Footer;
