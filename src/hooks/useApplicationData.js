import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(value) {
  // manage all the calls in a state
  const [allCalls, setAllCalls] = useState([]);
  const [unarchivedCalls, setUnarchivedCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);

  // make a get request to the api to retrive all the calls
  // this useEffect is triggered once again as the "value" changes which is a hook that changes state once user archives or un-archives
  useEffect(() => {
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then((res) => {
        setAllCalls(res.data);
      })
      .catch((err) => console.log(err));
  }, [value]);

  // function that separates unarchived and archived calls
  const isArchived = (allCalls) => {
    const archivedCalls = [];
    const unarchivedCalls = [];
    for (const call of allCalls) {
      if (call.is_archived === true) {
        archivedCalls.push(call);
      } else {
        unarchivedCalls.push(call);
      }
    }
    // index 0 of the returned array has all the archived calls, index 1 has all the unarchived calls
    return [archivedCalls, unarchivedCalls];
  };

  return { allCalls, isArchived };
}
