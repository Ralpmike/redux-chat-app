import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { useAppSelector } from './app/hooks/hooks'
import { selectAllUsers } from './features/users/usersSlice'
import { LoginPage } from './features/auth/LoginPage'
import PostMainPage from './features/posts/PostMainPage'
import ProctectedRoute from './components/ProctectedRoute'

export interface ProctectedRouteProps {
  children: React.ReactNode
}

function App() {
  // const ProctectedRoute = ({ children }: ProctectedRouteProps) => {
  //   const username = useAppSelector(selectAllUsers)

  //   if (!username) {
  //     ;<Navigate to="/" replace />
  //   }

  //   return children
  // }

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            // path="/*"
            element={
              <ProctectedRoute />

              // <ProctectedRoute>
              //   <Routes>
              //     <Route path="/posts" element={<PostMainPage />} />
              //     <Route path="/posts/:postId" element={<SinglePostPage />} />
              //     <Route path="/editPost/:postId" element={<EditPostForm />} />
              //   </Routes>
              // </ProctectedRoute>
            }
          >
            <Route path="/posts" element={<PostMainPage />} />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/editPost/:postId" element={<EditPostForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
