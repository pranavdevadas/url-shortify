import React from "react";
import { IoIosLink } from "react-icons/io";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import UrlShortener from "../components/UrlShortener";
import { FaLink } from "react-icons/fa6";


function HomeScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const homeScreenStyle = {
    minHeight: "100vh",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 270px",
  };

  return (
    <>
    <div style={homeScreenStyle}>
      {userInfo ? (
        <>
          <h4>
            <FaLink /> URLshortify
          </h4>
          <span className="text-center">
            Transform your long, cumbersome links into sleek, easy-to-share URLs
            with our user-friendly URL shortener! Perfect for simplifying links
            for social media posts, emails, or any online communication, our
            tool offers a quick and efficient solution to enhance your sharing
            experience. Say goodbye to unwieldy URLs and embrace the convenience
            of streamlined links today!
          </span>
          <UrlShortener />
        </>
      ) : (
        <>
          <h2>
            Welcome to URLshortener
            <IoIosLink />
          </h2>
          <p>
            Transform lengthy URLs into sleek, shareable links with ease! Our
            user-friendly tool simplifies link sharing for everyone—from
            businesses to social media enthusiasts. Enjoy features like
            customizable links and click tracking to optimize your online
            presence. Join us today and make your links cleaner and more
            manageable!
          </p>
          <LinkContainer to="/login">
            <Button variant="danger">Login to Shorteren your URL</Button>
          </LinkContainer>
        </>
      )}
    </div>
    </>
  );
}

export default HomeScreen;
