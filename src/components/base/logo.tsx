import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<LogoProps> = ({ href, src, children }) => {
  return (
    <div className="flex justify-start">
      <Link href={href ?? "/"}>
        <a className="btn gap-1 btn-ghost normal-case">
          <span className="sr-only">Logo</span>
          {src ? <Image src={src} alt="logo" /> : null}
          <h1 className="text-xl font-bold text-base-content">{children}</h1>
        </a>
      </Link>
    </div>
  );
};

type LogoProps = {
  href?: string;
  children?: React.ReactNode;
} & Partial<Pick<Parameters<typeof Image>[0], "src">>;

export default Logo;
