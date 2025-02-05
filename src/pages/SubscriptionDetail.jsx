import { useParams } from "react-router-dom";

function SubscriptionDetail() {
  const { id } = useParams();
  return <h1>Subscription Details for ID: {id}</h1>;
}

export default SubscriptionDetail;
