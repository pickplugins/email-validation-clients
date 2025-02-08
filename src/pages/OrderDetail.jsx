import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

function OrderDetail() {
  const { id } = useParams();


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

    fetch(appData.serverUrl + "wp-json/combo-payments/v2/get_order", {
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
    <Layout >


      <div className="p-5">
        <div>

          <h3 className="text-xl my-4">Order Details</h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">Status</div>
            <div className=""> {orderData?.status}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Setup Fee</div>

            <div className=""> {orderData?.setup_fee}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Tax</div>

            <div className=""> {orderData?.tax_total}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Discount</div>

            <div className=""> {orderData?.discount_total}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Date</div>

            <div className=""> {orderData?.datetime}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >Total</div>

            <div className=""> {orderData?.total}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Refunded_total</div>

            <div className=""> {orderData?.refunded_total}</div>
          </div>







        </div>

        <div>

          <h3 className="text-xl my-5">License </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">License Key</div>
            <div className=""> {licenseData?.license_key}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Activation Limit</div>

            <div className=""> {licenseData?.activation_limit}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Instances Count</div>

            <div className=""> {licenseData?.instances_count}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Test Mode</div>

            <div className=""> {licenseData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Status</div>

            <div className=""> {licenseData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">User Email</div>

            <div className=""> {licenseData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >Created at</div>

            <div className=""> {licenseData?.created_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Expires at</div>

            <div className=""> {licenseData?.expires_at}</div>
          </div>







        </div>
        <div>

          <h3 className="text-xl my-5">Subscription </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">Setup fee</div>
            <div className=""> {subscriptionData?.setup_fee}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">Total</div>
            <div className=""> {subscriptionData?.total}</div>

          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Billing Date</div>

            <div className=""> {subscriptionData?.billing_anchor}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Card Last Four</div>

            <div className=""> {subscriptionData?.card_last_four}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Test Mode</div>

            <div className=""> {subscriptionData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Status</div>

            <div className=""> {subscriptionData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">User Email</div>

            <div className=""> {subscriptionData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >Trial Ends at</div>

            <div className=""> {subscriptionData?.trial_ends_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Renews at</div>

            <div className=""> {subscriptionData?.renews_at}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">Ends at</div>

            <div className=""> {subscriptionData?.ends_at}</div>
          </div>







        </div>
      </div>







    </Layout>
  )


}

export default OrderDetail;
