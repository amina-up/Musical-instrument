import React from "react";
import NewCard from "./Cards/NewCard";
import Footer from "./footer/Footer";
import Partener from "./slider/Slider";
import "../admin/style.css";
import { Carousel } from "react-bootstrap";

const SubPage = () => {
  return (
    <div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block  w-100 image-carousel"
              src="slide.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="transitions">
                Des instruments pour le Cinéma Paysages Sonores, Tonalités et
                Transitions
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block  w-100 image-carousel"
              src="trbx-basse.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="dream-Electronics">
                Vous avez trouvé votre Dream Electronics?
              </h3>
              <div>
                <h2 className="dream-Electronics">
                  {" "}
                  Pourquoi attendre Obtenez-le maintenant avec un accord de
                  financement de 0% de Bionic Electronics.
                </h2>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block  w-100 image-carousel"
              src="Piano-yamaha.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="dream-Electronic">
                Bibliothèque musicale exclusive & disponible maintenant{" "}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* <img src="trbx-basse.jpg" alt="..." width="100%" /> */}
      </div>
      <Partener />
      <NewCard />

      <Footer />
    </div>
  );
};

export default SubPage;
