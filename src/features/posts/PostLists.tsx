import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostStatus } from './postSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButton'
import { useEffect } from 'react'
import { Spinner } from '@/components/Spinner'
import PostExcerpt from './PostExcerpt'

export const PostsList = () => {
  // Select the `state.posts` value from the store into the component
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      console.log('fetching posts', postStatus)

      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="loading ..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post: Post) => <PostExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <div>{postsError}</div>
  }

  // const sortedPosts = posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  // const renderedPosts = sortedPosts.map((post) => (
  //   <article className="post-excerpt" key={post.id}>
  //     <PostAuthor userId={post.user} />
  //     <h3>
  //       <Link to={`/posts/${post.id}`}>{post.title}</Link>
  //     </h3>
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <ReactionButtons post={post} />
  //     <TimeAgo timestamp={post.date} />
  //   </article>
  // ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
