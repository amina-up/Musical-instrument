import React, { Component } from "react";
import "./Slider.scss";
export default class Partener extends Component {
  render() {
    return (
      <div>
        <div class="slider">
          <div class="slide-track">
            <div class="slide">
              <i
                className="fas fa-guitar mr-1 slide"
                style={{ color: "black", height: "70", width: "50" }}
              ></i>
            </div>
            <div class="slide">
              <img
                src="https://www.chacunsaguitare.com/images/produits/161124.jpg"
                height="70"
                width="120"
                alt=""
                className="img"
              />
            </div>
            <div class="slide">
              <img
                src="https://www.adestia.se/wp-content/uploads/2019/06/AKG-liten-logo.jpg"
                height="70"
                width="120"
                alt=""
                className="img"
              />
            </div>
            <div className="slide">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCZ0qyqTQegZ4tt9cIG6igE3S4FDDXwhMDj42PUhmNuEfaK8oL"
                height="50"
                width="100"
                alt=""
                className="img"
              />
            </div>
            <div class="slide">
              <img
                src="https://www.logolynx.com/images/logolynx/cd/cd2e96e58e03ae672e68d087d009b095.jpeg"
                height="50"
                width="50"
                alt=""
                className="img"
              />
            </div>
            <div class="slide">
              <img
                src="https://www.cursos-dj.com/wp-content/uploads/2016/11/Roland.png"
                height="50"
                width="150"
                alt=""
                className="img"
              />
            </div>

            <div class="slide">
              <img
                src="http://img.sxsw.com/2015/events/YAMAHA_logomark_2010_BLACK_20130311085356342.jpg"
                height="50"
                width="150"
                alt=""
                className="img"
              />
            </div>
            <div class="slide">
              <img
                src="http://www.musicallweb.com/wp-content/uploads/2019/05/CasioLogo.jpg"
                height="100"
                width="250"
                alt=""
                className="img"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
