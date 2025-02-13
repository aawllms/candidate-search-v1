import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface.tsx";

//get data from github
//render data to this component by mapping over each object

//

const CandidateSearch = () => {
  //need state
  // const [githubUser, setGithubUser] = []

  const [githubUsers, setGithubUsers] = useState<Candidate[]>([]);

  const [currentUser, setCurrentUser] = useState<Candidate>({
    avatar_url: "",
    login: "",
    email: "",
    location: "",
    company: "",
    bio: "",
  });

  const [availableUsers, setAvailableUsers] = useState(true);

  const [currentIndex, setCurrentIndex] = useState<any>(0);
  // //need useEffect to grab the data

  useEffect(() => {
    //make call to api to get the data
    const getUsers = async function () {
      const users = await searchGithub();

      console.log(users);

      setGithubUsers(users);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getUser = async function () {
      const user = await searchGithubUser(githubUsers[currentIndex].login);
      console.log(user);

      setCurrentUser(user);
    };

    getUser();
  }, [githubUsers, currentIndex]);

  function nextUser() {
    if (currentIndex + 1 < githubUsers.length) {
      setCurrentIndex(currentIndex + 1);

      console.log(currentIndex);
    } else {
      setAvailableUsers(false);
    }
  }

  function saveUser() {
    const savedUsers = localStorage.getItem("candidates")
      ? JSON.parse(localStorage.getItem("candidates") || "[]")
      : [];

    savedUsers.push(currentUser);

    localStorage.setItem("candidates", JSON.stringify(savedUsers));

    nextUser();
  }

  //map over the data and create an ul with li that displays usernames
  return (
    <>
      <h1>Candidate Search</h1>

      {availableUsers ? (
        <>
          <div className="card">
            <img src={currentUser.avatar_url} />

            <h3>{currentUser.login}</h3>

            <p>
              Location:{" "}
              {currentUser?.location
                ? currentUser.location
                : "No location provided"}
            </p>
            <p>
              {" "}
              Email:{" "}
              {currentUser?.email
                ? currentUser.email
                : "No email provided"}{" "}
            </p>
            <p>
              Company:{" "}
              {currentUser?.company
                ? currentUser.company
                : "No company provided"}{" "}
            </p>
            <p>
              {" "}
              Bio: {currentUser?.bio ? currentUser.bio : "No Bio provided"}
            </p>
          </div>

          <div>
            <button onClick={nextUser} className="btnColor">
              <i className="fa-solid fa-circle-minus"></i>
            </button>
            <button onClick={saveUser} className="btnColor">
              <i className="fa-solid fa-circle-plus"></i>
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1>No More Candidates</h1>
        </div>
      )}
    </>
  );
};

export default CandidateSearch;
