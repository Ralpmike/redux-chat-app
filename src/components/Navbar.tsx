import { useAppSelector, useAppDispatch } from '@/app/hooks/hooks'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { userLoggedOut } from '@/features/auth/authSlice'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserIcon } from './UserIcon'

export const Navbar = () => {
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoggedIn = !!user

  let navContent: React.ReactNode = null

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(userLoggedOut())
      navigate('/', { replace: true })
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
        </div>
        <div className="userDetails">
          <UserIcon size={32} />
          {user.name}
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  )
}
