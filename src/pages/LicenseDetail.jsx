import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";

function LicenseDetail({user}) {
  const { id } = useParams();
  const { t } = useContext(AuthContext)


  var [appData, setappData] = useState(window.appData);


  var [subscriptionData, setsubscriptionData] = useState(null);
  var [orderData, setorderData] = useState(null);






  function fetchPost() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/email-validation/v2/get_subscription", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {



            var subscription = res?.subscription;
            var order = res?.order;



            setsubscriptionData(subscription)
            setorderData(order)






            setTimeout(() => {
            }, 500);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }

  // useEffect(() => {
  // 	fetchPost();
  // }, []);

  useEffect(() => {
    fetchPost();
  }, [id]);









  return (
    <Layout user={user} >

      <div>

        <h3 className="text-xl my-5">{t("Subscription")} </h3>


        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center">
          <div className=" px-5 py-2 w-40 font-bold">{t("Order")}</div>
          <div className=""> <a href={`orders/${orderData?.id}`}>#{orderData?.id}</a></div>

        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center">
          <div className=" px-5 py-2 w-40 font-bold">{t("Setup fee")}</div>
          <div className=""> {subscriptionData?.setup_fee}</div>

        </div>



        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center">
          <div className=" px-5 py-2 w-40 font-bold">{t("Total")}</div>
          <div className=""> {subscriptionData?.total}</div>

        </div>


        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("Billing Date")}</div>

          <div className=""> {subscriptionData?.billing_anchor}</div>

        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("Card Last Four")}</div>

          <div className=""> {subscriptionData?.card_last_four}</div>

        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("Test Mode")}</div>

          <div className=""> {subscriptionData?.test_mode}</div>

        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("Status")}</div>

          <div className=""> {subscriptionData?.status}</div>
        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("User Email")}</div>

          <div className=""> {subscriptionData?.user_email}</div>
        </div>


        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold" >Trial Ends at</div>

          <div className=""> {subscriptionData?.trial_ends_at}</div>

        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">Renews at</div>

          <div className=""> {subscriptionData?.renews_at}</div>
        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">Ends at</div>

          <div className=""> {subscriptionData?.ends_at}</div>
        </div>







      </div>







    </Layout>
  )


}

export default LicenseDetail;

