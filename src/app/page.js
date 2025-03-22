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
import { SidebarDemo } from './component/Sidebar'
function page() {
  return (
    <>
      <HomePage />
      <SidebarDemo />
    </>
  )
}

export default page