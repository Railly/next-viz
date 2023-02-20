import Image from "next/image";
import Button from "ui/Button";
import TextInput from "ui/TextInput";
import { loginSchema } from "validation/schemas";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/router";
import { initialRoutes } from "utils/data";
import authService from "services/auth";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const _user = window.localStorage.getItem("user");
    console.log({ _user });
    if (_user) {
      const newUser = JSON.parse(_user);
      setUser(JSON.parse(_user));
      router.push(initialRoutes[newUser.userType]);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setDisabled(true);
    try {
      const { data: user } = await authService.login(credentials);
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      if (user?.state) {
        if (user.state === "C-ON" || user.state === "C-OFF") {
          router.push("/alumno/certificado");
        } else {
          router.push("/alumno/matricula");
        }
      } else {
        const route = user.userType.length === 1 ? user.userType[0] : "admin";
        router.push(initialRoutes[route]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setDisabled(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  return loading ? (
    <div>Loading...</div>
  ) : (
    <main className="grid h-screen grid-cols-1 md:grid-cols-2 text-desk">
      <section
        className="flex-col items-center justify-center hidden bg-cover md:flex"
        style={{
          backgroundImage: "url(/images/biblioteca.jpg)",
        }}
      >
        <Image src="/images/unmsm-logo.png" width={154} height={231} />
        <h1 className="text-3xl font-bold text-white">
          Bienvenidos al <br />
          Centro de <br />
          Informática
        </h1>
      </section>
      <section className="flex flex-col items-center h-full bg-blue-50">
        <div className="flex justify-center w-full p-8 bg-blue-500">
          <Image src="/images/cinfo-logo.png" width={222} height={70} />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <form
            onSubmit={handleSubmit(login)}
            className="flex flex-col justify-center mx-3 bg-white rounded px-7 md:px-16 h-96 animate-fade-in-down"
          >
            <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
              Iniciar Sesión
            </h1>
            <TextInput
              label="Usuario"
              placeholder="Usuario"
              name="username"
              errors={errors.username}
              register={register}
              // defaultValue="railly@gmail.com"
              required
            />
            <TextInput
              type="password"
              label="Contraseña"
              placeholder="Contraseña"
              name="password"
              errors={errors.password}
              // defaultValue="123456"
              register={register}
            />
            <Button
              className="mt-6 w-60"
              variant="primary"
              size="medium"
              type="submit"
              disabled={disabled}
            >
              Iniciar Sesión
            </Button>
          </form>
          {error && (
            <div className="flex justify-center">
              <h1 className="font-bold text-center text-red-700">
                <span>{error}</span>
              </h1>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
