import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";

function OrderDetail({ user }) {
  const { id } = useParams();
  const { t } = useContext(AuthContext);


  var [appData, setappData] = useState(window.appData);


  var [orderData, setorderData] = useState(null);
  var [downloadsData, setdownloadsData] = useState(null);
  var [licenseData, setlicenseData] = useState(null);
  var [subscriptionData, setsubscriptionData] = useState(null);






  function fetchPost() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/email-validation/v2/get_order", {
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

            var order = res?.order;
            var downloads = res?.downloads;
            var license = res?.license;
            var subscription = res?.subscription;




            setorderData(order)
            setdownloadsData(downloads)
            setlicenseData(license)
            setsubscriptionData(subscription)





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


      <div className="p-5 grid grid-cols-2 gap-4">
        <div>

          <h3 className="text-xl my-4">{t("Order Details")}</h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("Status")}</div>
            <div className=""> {orderData?.status}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Setup fee")}</div>

            <div className=""> {orderData?.setup_fee}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Tax")}</div>

            <div className=""> {orderData?.tax_total}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Discount")}</div>

            <div className=""> {orderData?.discount_total}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Date")}</div>

            <div className=""> {orderData?.datetime}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{t("Total")}</div>

            <div className=""> {orderData?.total}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Refunded_total")}</div>

            <div className=""> {orderData?.refunded_total}</div>
          </div>







        </div>


        <div>

          <h3 className="text-xl my-5">{t("Subscription")} </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("Setup fee")}</div>
            <div className=""> {subscriptionData?.setup_fee}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("Total")}</div>
            <div className=""> {subscriptionData?.total}</div>

          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Billing Date")}</div>

            <div className=""> {subscriptionData?.billing_anchor}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Card Last Four')}</div>

            <div className=""> {subscriptionData?.card_last_four}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Test Mode')}</div>

            <div className=""> {subscriptionData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Status')}</div>

            <div className=""> {subscriptionData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('User Email')}</div>

            <div className=""> {subscriptionData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{t('Trial Ends at')}</div>

            <div className=""> {subscriptionData?.trial_ends_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Renews at')}</div>

            <div className=""> {subscriptionData?.renews_at}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Ends at')}</div>

            <div className=""> {subscriptionData?.ends_at}</div>
          </div>







        </div>

        <div className="hidden">

          <h3 className="text-xl my-5">{t("License")} </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("License Key")}</div>
            <div className=""> {licenseData?.license_key}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Activation Limit")}</div>

            <div className=""> {licenseData?.activation_limit}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Instances Count")}</div>

            <div className=""> {licenseData?.instances_count}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Test Mode")}</div>

            <div className=""> {licenseData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Status")}</div>

            <div className=""> {licenseData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("User Email")}</div>

            <div className=""> {licenseData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{t("Created at")}</div>

            <div className=""> {licenseData?.created_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Expires at")}</div>

            <div className=""> {licenseData?.expires_at}</div>
          </div>







        </div>
      </div>







    </Layout>
  )


}

export default OrderDetail;
