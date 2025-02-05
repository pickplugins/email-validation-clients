import { useParams } from "react-router-dom";

function LicenseDetail() {
  const { id } = useParams();
  return <h1>License Details for ID: {id}</h1>;
}

export default LicenseDetail;
