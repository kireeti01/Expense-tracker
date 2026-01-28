import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
  };

  const shapeVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { yoyo: Infinity, duration: 4, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(102, 126, 234, 0.4)",
      transition: { duration: 0.3, yoyo: Infinity },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="login-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Animation */}
      <div className="background-animation"></div>

      {/* Floating Shapes */}
      <motion.div className="floating-shapes">
        <motion.div className="shape shape-1" variants={shapeVariants} animate="animate" />
        <motion.div className="shape shape-2" variants={shapeVariants} animate="animate" />
        <motion.div className="shape shape-3" variants={shapeVariants} animate="animate" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="login-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="card-header">
          <h2 className="title">Expense Tracker</h2>
          <p className="subtitle">Login in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
            <label className="input-label">Username</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <label className="input-label">Password</label>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className="login-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Login</span>
            <div className="button-shimmer"></div>
          </motion.button>
        </form>

        <div className="footer-text">
          <p>
            Don't have an account? <Link to="/Register">Register</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
