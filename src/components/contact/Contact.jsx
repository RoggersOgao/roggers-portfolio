"use client";
import React, { useState, useCallback, useContext } from "react";
import styles from "./Contact.module.scss";

import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoTwitter,
  BiLogoFacebook,
  BiLogoInstagram,
} from "react-icons/bi";
import Image from "next/image";
import { VscError } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularBar from "../spinners/circularSpinner/CircularBar";
import { SendMail } from "../actions/SendMailAction";

function Contact() {
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case "name":
        if (!value) {
          errors.name = "Name is required";
        } else if (value.length > 60) {
          errors.name = "Name cannot exceed 60 characters";
        } else {
          delete errors.name;
        }
        break;
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!value.match(/^\S+@\S+\.\S+$/)) {
          errors.email = "Please enter a valid email address";
        } else {
          delete errors.email; // Clear the error if the field is valid
        }
        break;
      case "message":
        if (!value) {
          errors.message = "Message is required";
        } else if (value.length < 10 || value.length > 1000) {
          errors.message = "Message must be between 10 and 1000 characters";
        } else {
          delete errors.message; // Clear the error if the field is valid
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await SendMail(form)
      console.log(response)
      setIsLoading(false);
      setMessage(response);
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  
      setForm([]); // Clear the form
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      // Handle the error, display a toast, or provide user feedback as needed.
      toast.success(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  

  return (
    <div className={styles.container} id="contact">
      <ToastContainer
        style={{
          fontSize: "14px",
          marginTop: "5rem",
          position: "absolute",
          top: "200px",
        }}
      />
      <div className={styles.title}>
        <motion.h1
          initial={{
            opacity: 0,
            x: -20,
          }}
          transition={{
            duration: 0.4,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        >
          Contact Me
        </motion.h1>
      </div>
      <div className={styles.contact}>
        <div className={styles.contactLeft}>
          <motion.h1
            initial={{
              opacity: 0,
              x: 20,
            }}
            transition={{
              duration: 0.4,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
          >
            Get in touch with me today.
          </motion.h1>
          <div className={styles.contactDesc}>
            <div className={styles.contactDescLeft}>
              <div className={styles.text1}>
                <motion.p
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                >
                  I would love to hear from you! Whether you have a project in
                  mind, want to collaborate, or simply have a question, feel
                  free to reach out. Here&apos;s how you can get in touch:
                </motion.p>
              </div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                className={styles.icons}
              >
                <a
                  href="https://www.linkedin.com/in/roggers-ogao-b35718202/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <BiLogoLinkedin />
                  </i>
                </a>
                <a
                  href="https://github.com/RoggersOgao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <BiLogoGithub />
                  </i>
                </a>
                <a
                  href="https://twitter.com/RoggersOgao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <BiLogoTwitter />
                  </i>
                </a>
                <a
                  href="https://facebook.com/RoggersOgao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <BiLogoFacebook />
                  </i>
                </a>

                <a
                  href="https://www.instagram.com/roggers_ogao/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <BiLogoInstagram />
                  </i>
                </a>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                transition={{
                  duration: 0.4,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                className={styles.text2}
              >
                <p>
                  Let&apos;s connect and discuss how we can work together to
                  bring your ideas to life.Don&apos;t hesitate to drop me a
                  lineor connect through any of the above channels. I am looking
                  forward tohearing from you soon!
                </p>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                className={styles.text3}
              >
                <p>
                  Please note: Due to the high volume of inquiries, response
                  times may vary. However,I make it a priority to respond to all
                  messages in a timely manner.Thank you foryour understanding.
                </p>
              </motion.div>
            </div>
            <div className={styles.contactDescRight}>
              <form className={styles.form} onSubmit={handleSendEmail}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Eg. John Doe"
                    autoComplete="off"
                    className={formErrors.name ? styles.inputError : ""}
                    value={form.name || ""}
                    required
                    onChange={(e) => {
                      setField("name", e.target.value),
                        validateField("name", e.target.value);
                    }}
                    style={form.name ? { marginTop: "2.4rem" } : null}
                  />
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.3 }} // Add a delay before exit animation
                      >
                        <VscError /> {formErrors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="JohnDoe@example.com"
                    autoComplete="off"
                    className={formErrors.email ? styles.inputError : ""}
                    value={form.email || ""}
                    required
                    onChange={(e) => {
                      setField("email", e.target.value),
                        validateField("email", e.target.value);
                    }}
                    style={form.email ? { marginTop: "2.4rem" } : null}
                  />
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.3 }} // Add a delay before exit animation
                      >
                        <VscError /> {formErrors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    placeholder="Enter your message here"
                    className={formErrors.message ? styles.inputError : ""}
                    required
                    value={form.message || ""}
                    onChange={(e) => {
                      setField("message", e.target.value),
                        validateField("message", e.target.value);
                    }}
                    style={form.message ? { marginTop: "2.4rem" } : null}
                  />
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.3 }} // Add a delay before exit animation
                      >
                        <VscError /> {formErrors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.btnCont}>
                    <button type="submit">
                      {isLoading ? <CircularBar /> : "Send"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.contactRight}>
          <Image
            src="/assets/3d.png"
            alt="3d image illustration"
            width={300}
            height={800}
            className={styles.img}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
