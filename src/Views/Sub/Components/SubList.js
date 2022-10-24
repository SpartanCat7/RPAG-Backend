import { ListGroup } from "react-bootstrap"

export default function SubList({ subscriptionList, setSelectedSubId }) {
    if (!subscriptionList || subscriptionList.length === 0) {
        return (
            <h5>Lista actualmente vacia</h5>
        )
    } else {
        return (
            <ListGroup>
                {
                    subscriptionList.map((sub, index) => {
                        return (<ListGroup.Item key={sub.subId} action onClick={() => setSelectedSubId(sub.subId)}>
                            {index} - {sub.typeId} - {sub.destination} - {"(" + sub.active + ")"}
                        </ListGroup.Item>)
                    })
                }
            </ListGroup>
        )
    }
}