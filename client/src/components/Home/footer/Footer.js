import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="site-footer">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-6 col-xs-12">
                <Link to="/condition">
                  <h2 style={{ color: "black" }}>
                    <Link to="/">
                      <i
                        className="fas fa-guitar mr-1"
                        style={{ color: "black" }}
                      ></i>
                    </Link>
                    Condition d'utilisation
                  </h2>
                </Link>
                <p class="copyright-text" style={{ color: "black" }}>
                  Copyright &copy; 2020 All Rights Reserved by
                </p>
              </div>

              <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
                  <li>
                    <a class="facebook" href="https://fr.wikipedia.org/wiki/Facebook_Zero">
                      <i class="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a class="twitter" href="https://twitter.com/?lang=fr">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>

                  <li>
                    <a class="linkedin" href="https://twitter.com/?lang=fr">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
