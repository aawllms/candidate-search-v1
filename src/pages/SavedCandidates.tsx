import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("candidates")
      ? JSON.parse(localStorage.getItem("candidates") || "[]")
      : [];

    setSavedCandidates(savedUsers);
  }, []);

  const rejectUser = (event: any) => {
    console.log(event.currentTarget);
    const userName = event.currentTarget.id;

    const savedUsers = localStorage.getItem("candidates")
      ? JSON.parse(localStorage.getItem("candidates") || "[]")
      : [];

    const updatedList = savedUsers.filter((user: any) => {
      return user.login !== userName;
    });
    localStorage.setItem("candidates", JSON.stringify(updatedList));
    setSavedCandidates(updatedList);
  };

  return (
    <>
      <h1>Potential Candidates</h1>

      <table className="table">
        <thead>
          <th>Image</th>
          <th>Username</th>
          <th>Location</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </thead>

        <tbody>
          {savedCandidates.map((candidate) => {
            return (
              <tr>
                <td>
                  <div className="data-box">
                    <img src={candidate.avatar_url} alt="" />
                  </div>
                </td>
                <td>{candidate.login}</td>
                <td>
                  {candidate?.location
                    ? candidate.location
                    : "No location provided"}
                </td>
                <td>
                  {" "}
                  {candidate?.company
                    ? candidate.company
                    : "No company provided"}{" "}
                </td>
                <td> {candidate?.bio ? candidate.bio : "No Bio provided"} </td>
                <td>
                  <div className="data-box">
                    <button
                      id={candidate.login}
                      className="btnColor"
                      onClick={rejectUser}
                    >
                      <i className="fa-solid fa-circle-minus"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
