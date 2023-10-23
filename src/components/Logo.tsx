import logo from "../assets/logo.png";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function Logo({ className }: LogoProps) {
  return <img src={logo} alt="Tesodev logo" className={className} />;
}

export default Logo;
