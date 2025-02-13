// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  avatar_url: string;
  login: string;
  email: string;
  location?: string;
  company?: string;
  bio?: string;
}

export default Candidate;
