/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '../../storeAtom/Atom';
import { toast } from 'react-toastify';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66ac7e7d0000a652d698');

const account = new Account(client);

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      await account.createEmailPasswordSession(email, password);
      await account.getSession("current");
        const user = await account.get();
      setLoading(false);
      setUserDetails(user)
      navigate("/"); 
      toast.success("Jaa zee le apni Zindagi!!");

    } catch (error) {
      setLoading(false);
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div className="min-h-screen md:mt-0 -mt-20 flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Sign In</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address'
              }
            })}
            className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
        </div>

        <button 
          type="submit" 
          className={`w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account? <Link to="/signup" className="text-orange-600 hover:underline">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;








// Anubrata@3604
// amon:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cGJuZ3poaXZjbXFqaHV2enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTg1OTYsImV4cCI6MjAzNzk3NDU5Nn0.DpFUOM6Oxy5S43SAdbf0r1TzTkcrQBxDxBC88XBQSbM
// apikey:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cGJuZ3poaXZjbXFqaHV2enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTg1OTYsImV4cCI6MjAzNzk3NDU5Nn0.DpFUOM6Oxy5S43SAdbf0r1TzTkcrQBxDxBC88XBQSbM
// passkey:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cGJuZ3poaXZjbXFqaHV2enpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjM5ODU5NiwiZXhwIjoyMDM3OTc0NTk2fQ.5lniRsXXpr0KPfa_xI-euoffNoJoLc3vhjQNO6wVUJ4
// url:https://gvpbngzhivcmqjhuvzzg.supabase.co

