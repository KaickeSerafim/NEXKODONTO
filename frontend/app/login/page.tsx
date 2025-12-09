"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { LoginFormData, loginSchema } from "../schemas/login";
import Image from "next/image";
import { Login } from "@/lib/api/login/login";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
  const [backendError, setBackendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter()
  const onSubmit = async (data: LoginFormData) => {
    try {
      setBackendError(null); // limpa erro anterior
      const user = await Login(data);

      router.push('/teste');
    } catch (err: any) {
      
      setBackendError(err.message); // ⬅️ mostra na tela
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm relative z-10">
        <CardHeader className="space-y-3 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-black rounded-xl flex items-center justify-center shadow-lg">
            <Image alt="LOGO NEXK" width={50} height={50} src="/NEXK.png" />
          </div>
          <CardTitle className="text-center text-slate-800">
            <h1 className="text-5xl font-black tracking-tight">NEXK</h1>
            <h2 className="text-2xl font-bold text-slate-500 tracking-wide">
              ODONTO
            </h2>
          </CardTitle>
          <p className="text-muted-foreground text-sm">Entre na sua conta</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className="h-11"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-11"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg"
            >
              Entrar
            </Button>

            {backendError && (
              <p className="text-red-500 text-sm text-center">{backendError}</p>
            )}
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-slate-500 hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
