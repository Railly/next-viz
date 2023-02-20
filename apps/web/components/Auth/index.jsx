import { UserContext } from "context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Button from "ui/Button";

export default function Auth({ children, role }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const _user = window.localStorage.getItem("user");
    if (_user) {
      const _userParsed = JSON.parse(_user);
      if (typeof _userParsed.userType === "string") {
        _userParsed.userType = [_userParsed.userType];
      }
      setUser(_userParsed);
      setLoading(false);
    } else {
      router.push("/permiso-denegado/");
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (
        role &&
        !user.userType.includes(role) &&
        user.userType[0] !== "admin" &&
        user.userType.length === 1
      ) {
        router.push("/permiso-denegado");
      }
    }
  }, [loading]);

  if (user?.userType[0] === "admin" || user?.userType.length > 1) {
    return (
      <div className="relative">
        {children}
        <Button
          className="absolute top-0 right-0 w-48"
          variant="white"
          onClick={() => router.push("/dashboard")}
        >
          Ir a Panel Principal
        </Button>
      </div>
    );
  }

  if (
    !user?.userType.includes(role) ||
    user?.userType[0] === "admin" ||
    !user
  ) {
    return <div>Loading...</div>;
  }

  return children;
}
