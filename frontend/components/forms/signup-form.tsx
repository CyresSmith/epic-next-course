'use client';

import { registerUserAction } from '@/data/actions/auth-actions';
import Link from 'next/link';
import { useActionState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ZodErrors } from '@/components/custom/zod-errors';
import { StrapiErrors } from '../custom/strapi-errors';
import { SubmitButton } from '../custom/submit-button';

const INITIAL_STATE = {
    data: null,
};

export function SignupForm() {
    const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);

    console.log('## will render on client ##');
    console.log(formState);
    console.log('###########################');

    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your details to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username"
                            />
                            <ZodErrors error={formState?.zodErrors?.username} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <ZodErrors error={formState?.zodErrors?.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            <ZodErrors error={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
                        <StrapiErrors error={formState?.strapiErrors} />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Have an account?
                    <Link className="underline ml-2" href="signin">
                        Sing In
                    </Link>
                </div>
            </form>
        </div>
    );
}
