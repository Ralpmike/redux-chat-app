import { ProctectedRouteProps } from '@/App'
import { useAppSelector } from '@/app/hooks/hooks'
import { selectAllUsers } from '@/features/users/usersSlice'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProctectedRoute() {
  const username = useAppSelector(selectAllUsers)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProctectedRoute
