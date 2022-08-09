import classNames from "@/lib/utils/classNames";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<LogoProps> = ({ href, src, children, size = "w-6" }) => {
  return (
    <div className="flex justify-start">
      <Link href={href ?? "/"}>
        <a className="btn gap-1 btn-ghost normal-case">
          {src ? (
            <div className={classNames(size, "relative aspect-square")}>
              <Image src={src} alt="logo" layout="fill" />
            </div>
          ) : null}
          <h1 className="text-xl font-bold text-base-content">{children}</h1>
          <span className="sr-only">Logo</span>
        </a>
      </Link>
    </div>
  );
};

type LogoProps = {
  href?: string;
  children?: React.ReactNode;
  size?: `w-${number}` | `h-${number}`;
} & Partial<Pick<Parameters<typeof Image>[0], "src">>;

export default Logo;
