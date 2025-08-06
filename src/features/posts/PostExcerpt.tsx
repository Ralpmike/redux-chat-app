import React from 'react'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButton'
import { TimeAgo } from '@/components/TimeAgo'
import { Link } from 'react-router-dom'
import { Post } from './postSlice'

function PostExcerpt({ post }: { post: Post }) {
  return (
    <article className="post-excerpt" key={post.id}>
      <PostAuthor userId={post.user} />
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <TimeAgo timestamp={post.date} />
    </article>
  )
}

export default PostExcerpt
