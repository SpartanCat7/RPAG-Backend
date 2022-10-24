import { ListGroup } from "react-bootstrap"

export default function UserList(props) {
    if (!props.userList || props.userList.length === 0) {
        return (
            <h5>Lista actualmente vacia</h5>
        )
    } else {
        return (
            <ListGroup>
                {
                    props.userList.map((user, index) => {
                        return (<ListGroup.Item key={user.userId} action onClick={() => { props.setSelectedUserId(user.userId) }}>
                            {index} - {user.username} - {"(" + user.email + ")"}
                        </ListGroup.Item>)
                    })
                }
            </ListGroup>
        )
    }
}