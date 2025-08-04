import { useAppSelector } from '@/app/hooks/hooks'
import { selectAllPosts } from './postSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButton'

export const PostsList = () => {
  // Select the `state.posts` value from the store into the component
  const posts = useAppSelector(selectAllPosts)

  const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = sortedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <PostAuthor userId={post.user} />
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <TimeAgo timestamp={post.date} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
