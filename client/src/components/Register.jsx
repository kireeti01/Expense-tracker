import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password) return "Password is required";
    if (!regex.test(password))
      return "Min 8 chars, uppercase, lowercase, number & symbol";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!formData.email.includes("@"))
      newErrors.email = "Enter a valid email";

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Registration Successful ✅");
    }
  };

  // Framer Motion Variants
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
      className="registration-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.form
        className="registration-card"
        onSubmit={handleSubmit}
        variants={cardVariants}
      >
        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <small>{errors.username}</small>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <small>{errors.email}</small>
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
          <small>{errors.password}</small>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <small>{errors.confirmPassword}</small>
        </div>

        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Register
        </motion.button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.form>
    </motion.div>
  );
};

export default Register;
