import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
      status,
      canResetPassword,
      canRegister,
  }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Head title="Login" />
            <Form
                {...store.form()}
                resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
                            <CardHeader className="text-center">
                                <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">A</div>
                                    <span className="text-xl font-bold">acme</span>
                                </div>
                                <CardTitle className="text-xl">Welcome back</CardTitle>
                                <CardDescription>Sign in to your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        tabIndex={2}
                                        placeholder="••••••••"
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="remember" />
                                        <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
                                    </div>
                                    <div className="flex items-center">
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-sm text-primary hover:underline"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                                {canRegister && (
                                    <p className="text-center text-sm text-muted-foreground">
                                        Don't have an account?{" "}
                                        <TextLink
                                            href={register()}
                                            tabIndex={5}
                                            className="text-primary hover:underline font-medium">
                                            Sign up
                                        </TextLink>
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}
