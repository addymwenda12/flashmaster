import React from 'react'
import { UserProfile } from '@clerk/nextjs'

function ProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen pb-10">
      <UserProfile />
    </div>
  );
}

export default ProfilePage
