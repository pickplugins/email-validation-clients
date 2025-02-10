import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import EntriesTable from "../components/EntriesTable";
import Spinner from "../components/Spinner";

function TaskDetail() {
  const { id } = useParams();


  var [appData, setappData] = useState(window.appData);
  var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "", });
  var [addEntries, setaddEntries] = useState({ emails: "", edit: false, loading: false, success: false, errors: false });


  var [tasksEntries, settasksEntries] = useState(null);
  var [loading, setloading] = useState(false);





  function fetchPosts() {

    console.log(queryPrams);


    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }
    var postData = {
      task_id: id,
      limit: queryPrams.limit,
      page: queryPrams.page,
      order: queryPrams.order,
    };
    postData = JSON.stringify(postData);

    setloading(true);


    fetch(appData.serverUrl + "wp-json/email-validation/v2/get_tasks_entries", {
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


            var posts = res?.posts;
            var total = res?.total;
            var max_pages = res?.max_pages;

            settasksEntries({ posts: posts, total: total, maxPages: max_pages })

            setloading(false);


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

  function addTaskEntries() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    setloading(true);


    var postData = {
      task_id: id,
      emails: addEntries.emails,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/email-validation/v2/add_tasks_entries", {
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

            console.log(res)

            // var posts = res?.posts;
            // var total = res?.total;
            // var max_pages = res?.max_pages;

            // settasksEntries({ posts: posts, total: total, maxPages: max_pages })
            setloading(false);

            fetchPosts()
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
  // 	fetchPosts();
  // }, []);

  useEffect(() => {
    fetchPosts();
  }, [id]);


  var columns = {
    id: { label: "ID" },
    email: { label: "Email" },
    status: { label: "Status" },
    result: { label: "Result" },

    datetime: { label: "Datetime" },
  }

  useEffect(() => {

    fetchPosts();
  }, [queryPrams]);

  function onChangeQueryPrams(args) {

    console.log(args);
    if (args) {
      setqueryPrams({ ...queryPrams, ...args })
      //fetchPosts();
    }

  }



  return (
    <Layout >


      <div className="">

        <div className="flex justify-between p-4 ">

          <div className="flex gap-3 items-center">
            <div className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" onClick={ev => {
              setaddEntries({ ...addEntries, edit: !addEntries.edit })
            }}>Add Emails</div>

            {addEntries.edit && (
              <>


                <textarea name="" id="" className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-[400px]" value={addEntries?.emails} onChange={ev => {
                  setaddEntries({ ...addEntries, emails: ev.target.value })

                }}>
                </textarea>

                <div onClick={ev => {
                  addTaskEntries();



                }} className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" >Submit</div>
              </>
            )}

            {addEntries.loading && (
              <><Spinner /></>
            )}
            {addEntries.errors && (
              <>There is an error.</>
            )}
            {addEntries.success && (
              <>Task Added.</>
            )}

          </div>



          <div>
            <div className="px-3 py-[5px] rounded-sm bg-gray-600 hover:bg-gray-500 text-white cursor-pointer" onClick={ev => {

            }}>Download</div>


          </div>
        </div>
        <EntriesTable queryPrams={queryPrams} columns={columns} entries={tasksEntries} itemPath={""} onChange={onChangeQueryPrams} loading={loading} />




      </div>







    </Layout>
  )


}

export default TaskDetail;
