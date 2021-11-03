import { useContext } from 'react'
import UserContext from '~/lib/UserContext'
import { deleteMessage } from '~/lib/Store'
import TrashIcon from '~/components/TrashIcon'

const Message = ({ message }) => {
  const { user, userRoles } = useContext(UserContext)
  const replacedmessage = message.inserted_at.replace('T', '  ').replace('-', '/').replace('-', '/').replace('Z', '')

  function addid(textstr, id){
    if (!(textstr.indexOf(">>", 0) == -1)) {
      console.log('[' + id + '] >> found!')
      return textstr
    } else {
      console.log('[' + id + '] >> Not found!')
      return textstr
    }
  }

  return (
    <div className="py-1 flex items-center space-x-2">
      <div className="text-gray-100 w-4">
        {(user?.id === message.user_id ||
          userRoles.some((role) => ['admin', 'moderator'].includes(role))) && (
          <button onClick={() => deleteMessage(message.id)}>
            <TrashIcon />
          </button>
        )}
      </div>
      <div>
        <a name={message.id}><p className="text-white font-bold">{message.author.username}</p>
        <p className="text-gray-500">{message.id} - {replacedmessage.substring(0, replacedmessage.indexOf("."))}</p>
        <p className="text-white">{addid(message.message, message.id)}</p></a>
      </div>
    </div>
  )
}

export default Message
