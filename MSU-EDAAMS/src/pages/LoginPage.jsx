import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useToast } from '../components/ToastService';

// import { Alert } from 'react-feather'
import { LuAlertCircle } from 'react-icons/lu';
import { Typography } from '@material-tailwind/react';

const Login = () => {

  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  // const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:7000/user/login", { email, password })
      .then((response) => {
        const { token, userId } = response.data;
        localStorage.setItem("token", token);

        // Use the userId to fetch user details
        axios
          .get(`http://localhost:7000/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((userResponse) => {
            const userDetails = userResponse.data;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            toast.open(
              <div className='flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg'>
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant='h3'>Success!</Typography>
                  <Typography variant='paragraph'>You have logged in Successfully.</Typography>
                </div>

              </div>
            )
            // Redirect to profile page or protected route
            navigate('/createDocument');
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });

        // Redirect to dashboard or protected route
        // navigate('/dashboard');
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handleRegister = async () => {
    navigate("/registration ");
  };

  return (
    <div>
      {/* <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      /> */}
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <a href="#">
                {/* <img
                  src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
                  alt="Return home"
                /> */}
              </a>
            </div>
            <div className="contact">
              <form action="">
                <h3>SIGN IN</h3>
                <input type="text" placeholder="USERNAME" />
                <input type="text" placeholder="PASSWORD" />
                <button className="submit">LOG IN</button>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="right-text">
              <h2>MSU - EDAAMS</h2>
              <h5>
                "An electronic document approval and archive management system
                is a software solution designed to streamline the process of
                approving and managing documents in digital format".
              </h5>
            </div>
            <div className="right-inductor">
              {/* <img
                src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
