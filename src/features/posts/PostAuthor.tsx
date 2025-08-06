import { useAppSelector } from '@/app/hooks/hooks'
import { selectUserById } from '@/features/users/usersSlice'

interface PostAuthorProps {
  userId: string | null
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author?.name ?? 'Unknown author'}</span>
}
