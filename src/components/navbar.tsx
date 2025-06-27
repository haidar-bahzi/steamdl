"use client";

import { BsCompassFill, BsCollectionFill, BsClockFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(globalThis.innerWidth < 1024);
    };

    handleResize();

    globalThis.addEventListener("resize", handleResize);
    return () => {
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar bg-transparent">
      <div className="flex-1">
        <a
          href="/"
          className="btn btn-ghost no-animation hover:bg-transparent text-xl text-white"
        >
          STEAMDL
        </a>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              href="/"
              className={`text-sm hover:text-[#66C0F4] !bg-transparent ${
                router!.includes("/browse")
                  ? "text-[#66C0F4]"
                  : "text-[#8F98A0]"
              }`}
            >
              {isMobile ? (
                <i className="text-lg">
                  <BsCompassFill />
                </i>
              ) : (
                <>
                  <i>
                    <BsCompassFill />
                  </i>
                  <p>Browse</p>
                </>
              )}
            </a>
          </li>
          <li>
            <a
              href="/collection"
              className={`text-sm hover:text-[#66C0F4] !bg-transparent ${
                router!.includes("/collection")
                  ? "text-[#66C0F4]"
                  : "text-[#8F98A0]"
              }`}
            >
              {isMobile ? (
                <i className="text-lg">
                  <BsCollectionFill />
                </i>
              ) : (
                <>
                  <i>
                    <BsCollectionFill />
                  </i>
                  <p>Collection</p>
                </>
              )}
            </a>
          </li>
          <li>
            <a
              href="/history"
              className={`text-sm hover:text-[#66C0F4] !bg-transparent ${
                router!.includes("/history")
                  ? "text-[#66C0F4]"
                  : "text-[#8F98A0]"
              }`}
            >
              {isMobile ? (
                <i className="text-lg">
                  <BsClockFill />
                </i>
              ) : (
                <>
                  <i>
                    <BsClockFill />
                  </i>
                  <p>History</p>
                </>
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
