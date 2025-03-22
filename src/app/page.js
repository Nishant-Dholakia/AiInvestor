import React from 'react'
import { HomePage } from './component/HomePage'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
function page() {
  return (
    <>
      <HomePage />
    </>
  )
}

export default page