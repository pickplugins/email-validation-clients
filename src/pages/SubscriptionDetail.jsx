import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";

function OrderDetail({ user }) {
  const { id } = useParams();


  var [appData, setappData] = useState(window.appData);


  var [subscriptionData, setsubscriptionData] = useState(null);
  var [subscriptionURLs, setsubscriptionURLs] = useState(null);
  var [orderData, setorderData] = useState(null);

const { t, token } = useContext(AuthContext);
  useEffect(() => {


  }, [subscriptionData]);



  function fetchPost() {
    // const token = localStorage.getItem("token");

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

            var urls = subscription?.urls;

            var urls = JSON.parse(urls)

            setsubscriptionURLs(urls);


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

      <div className="p-5">

        <h3 className="text-xl my-5">{t("Subscription")} </h3>


        <div className="flex gap-2 items-center my-5">

          <a target="_blank" className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white" href={subscriptionURLs?.customer_portal}>{t("Customer Portal")}</a>
          <a target="_blank" className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white" href={subscriptionURLs?.customer_portal_update_subscription}>{t("Update Subscription")}</a>
          <a target="_blank" className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white" href={subscriptionURLs?.update_payment_method}>{t("Update Payment Method")}</a>

        </div>


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
          <div className=" px-5 py-2 w-40 font-bold">{t("Test Mode")} </div>

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
          <div className=" px-5 py-2 w-40 font-bold" >{t("Trial Ends at")}</div>

          <div className=""> {subscriptionData?.trial_ends_at}</div>

        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("Renews at")}</div>

          <div className=""> {subscriptionData?.renews_at}</div>
        </div>
        <div className="bsubscription-0 bsubscription-b bsubscription-solid bsubscription-gray-200 flex gap-3 items-center ">
          <div className=" px-5 py-2 w-40 font-bold">{t("Ends at")}</div>

          <div className=""> {subscriptionData?.ends_at}</div>
        </div>







      </div>







    </Layout>
  )


}

export default OrderDetail;
