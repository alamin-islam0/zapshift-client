import React from "react";
import { BsGoogle } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {

    const {signInGoogle} = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();

    const handleSignIn = () => {
        signInGoogle()
        .then(result => {
            console.log(result.user)

            //create user in database
          const userInfo = {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          }

          axiosSecure.post('/users', userInfo)
          .then(res => {
            console.log('User data has been stored', res.data)
            navigate(location.state || '/')
          })
        })
        .catch(error => {
            console.log(error)
        })
    }
  return (
    <div>
      <p className="pt-5 text-center">OR</p>
      <button
      onClick={handleSignIn}
        type="button"
        className="w-full mt-6 flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full py-3 mb-6 shadow-sm hover:bg-gray-50 transition"
      >
        {/* Google Icon made using Lucide */}
        <div>
          <BsGoogle />
        </div>

        <span className=" font-semibold text-[#03373d]">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
