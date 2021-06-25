const UsersList = ({ users, username }) => {
  return (
    <div>
      <h3 style={{ margin: 0, padding: 0 }}><b>Users Joined: {Object.keys(users).length}</b></h3>
      {
        Object.keys(users).map(key => {
          return (
            (users[key].username === username)
              ? <h3 key={key} style={{ margin: 0, padding: 0 }}>You: {users[key].username}</h3>
              : <h3 key={key} style={{ margin: 0, padding: 0 }}>{users[key].username}</h3>
          );
        })
      }
    </div>
  )
}

export default UsersList
