import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header>
      <div>
        <div className="topNav">
          <Image alt="logo" src={'/images/logo_black.png'} width={50} height={50} />
          <nav>
            <ul>
              <li>
                <Link href="/" passHref legacyBehavior>
                  <a> Home</a>
                </Link>
              </li>
              <li>
                <Link href="/events" passHref legacyBehavior>
                  <a> Events</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref legacyBehavior>
                  <a> About us</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="title"> Sed ut perspiciatis unde omnis</p>
      </div>
    </header>
  );
};
