"use client";

import { useActionState } from "react";
import { login } from "./actions";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
        
        <div className='mx-auto grid h-screen items-center justify-center bg-light dark:bg-[#012432] lg:grid-cols-2'>
            <div className='relative hidden h-screen overflow-hidden bg-primary lg:flex lg:items-end lg:justify-center'>
                {/* blob 1 */}
                <div className='absolute -left-36 -top-36 flex h-96 w-96 items-center justify-center rounded-full bg-accent/50'></div>

                {/* blob 2 */}
                <div className='absolute -bottom-96 -left-16 flex h-[38rem] w-[38rem] items-center justify-center rounded-full bg-accent/50'></div>

                {/* <Image className='relative max-h-screen w-80 object-contain' src="#" alt='Asset Login' /> */}
            </div>

            <div className='apply-dark relative mx-auto w-[calc(100vw-2rem)] space-y-12 rounded-lg bg-white p-6 shadow dark:bg-dark sm:w-[26rem] lg:p-8'>
                <header>
                    <Link href={`/home`}>
                        {/* logo */}
                        {/* <Logo className='w-24' /> */}
                    </Link>

                    <h1 className='text-base'>Welcome</h1>
                </header>

                <form action={loginAction} className="flex max-w-[300px] flex-col gap-2">

                    <div className='flex flex-col items-center gap-y-2'>
                        <Input
                            className='border bg-light text-dark duration-300 dark:border-primary/25 dark:bg-dark dark:text-light'
                            name='username'
                            variant='bordered'
                            type='text'
                            radius='sm'
                            isRequired
                            placeholder="Username"
                        />

                        <Input
                            className='border bg-light text-dark duration-300 dark:border-primary/25 dark:bg-dark dark:text-light' 
                            name='password'
                            variant='bordered'
                            type="password"
                            radius='sm'
                            isRequired
                            placeholder="Password"
                        />
                    </div>

                    <Button className='w-full' type='submit' color='primary' radius='sm'>
                        Login
                    </Button>
                </form>
            </div>
        </div>
  );
}
