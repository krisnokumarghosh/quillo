import LoginForm from '@/components/authentication/LoginForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Quillo account to access your dashboard and continue writing.",
};

const LoginPage = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;