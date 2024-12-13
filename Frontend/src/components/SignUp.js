import React, { useState } from "react";
import "./CSS/SignUp.css";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialLogin = () => (
  <div className="social-login">
    <button className="social-btn google">
      <FaGoogle /> Sign in with Google
    </button>
    <button className="social-btn github">
      <FaGithub /> Sign in with GitHub
    </button>
  </div>
);

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Signup successful! Welcome, " + result.username);
  
        setTimeout(() => {
          window.location.href = "/signin"; // Change the URL to your sign-in page
        }, 100); // Delay to allow alert to display
      } else {
        const error = await response.json();
        
        if (error.errors) {
          // Display validation errors from the backend
          error.errors.forEach(err => {
            alert(`${err.field}: ${err.message}`);
          });
        } else {
          // General error message
          alert("Signup failed: " + error.message);
        }
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("An error occurred during signup. Please try again later.");
    }
  };  

  return (
    <div className="signup-page">
      <div className="container">
        <SocialLogin />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
        <div className="forgot-password">
          <a href="#recover">Forgot your password?</a>
        </div>
        <div className="already-user">
          <p>
            Already a user?{" "}
            <a href="/signin" className="signin-link">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;