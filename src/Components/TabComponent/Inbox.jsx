import React, {useEffect} from 'react';
import "../../css/tab.css"
import axios from 'axios';

export default function Inbox() {

  // manage all activites in a state

  useEffect(() => {
    // make a get request to the api to retrive all activities
    axios.get('https://aircall-job.herokuapp.com/activities')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
  <div className="inbox-container">
    <div>Archive all calls</div>
    <div>Call #1</div>
  </div>
  );
}
