import React from "react";
import { Image, Layout } from "antd";
const { Content } = Layout;
import AboutUs from "./AboutUs";
import ContactForm from "./contactForm/ContactForm";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="homePage">
        <section id="initialPage">
          <h1>Business</h1>
          <div
            className="homeContent"
            style={{
              background: "#f5f5f5",
              minHeight: 28,
              padding: 24,
              borderRadius: "borderRadiusLg",
            }}
          >
            <p>
              Doggo ipsum Shibe corgo extremely cuuuuuute doggorino noodle horse
              length boy, puggo woofer doing me a frighten pats. The
              neighborhood pupper long bois super chub doggo puggo, noodle horse
              clouds adorable doggo. Aqua doggo smol puggorino heckin good boys
              floofs long woofer, doggorino very jealous pupper lotsa pats. I am
              bekom fat aqua doggo boofers very good spot I am bekom fat snoot
              maximum borkdrive, boof blep borkf you are doing me the shock
              pupperino. fluffer you are doing me the shock. Doge vvv you are
              doing me a frighten length boy blep such treat mlem adorable doggo
              tungg, shooberino long bois much ruin diet mlem wow very biscit
              long woofer blep. Very good spot heckin good boys pupper boofers
              maximum borkdrive, shooberino sub woofer. such treat doing me a
              frighten. Ruff long water shoob heckin angery woofer, bork.
            </p>
            <p>
              noodle horse puggorino doggorino. Doge fluffer long water shoob
              lotsa pats pats, the neighborhood pupper you are doing me a
              frighten long bois. Aqua doggo big ol boof big ol pupper, waggy
              wags. Blop bork boof heckin angery woofer big ol pupper noodle
              horse snoot, heck much ruin diet long bois lotsa pats long woofer
              pupper, blep borkdrive the neighborhood pupper big ol smol. Super
              chub porgo doggo shooberino, very good spot. Long doggo mlem long
              woofer doggo yapper, snoot borkf I am bekom fat lotsa pats yapper,
              borking doggo lotsa pats mlem. Thicc I am bekom fat maximum
              borkdrive heckin good boys and girls, what a nice floof.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image.PreviewGroup
              items={[
                " https://res.cloudinary.com/ddxwdqwkr/image/upload/v1632192015/smashing-articles/206-webp-ayousef-espanioly-DA_tplYgTow-unsplash.webp",
                "https://www.widerangegalleries.com/images/xl/20191028-Giau-Glow.jpg",
                "https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704412800&semt=sph",
              ]}
            >
              <Image
                className="images "
                width={500}
                src=" https://res.cloudinary.com/ddxwdqwkr/image/upload/v1632192015/smashing-articles/206-webp-ayousef-espanioly-DA_tplYgTow-unsplash.webp"
              />
            </Image.PreviewGroup>
          </div>
        </section>
        <section id="aboutUsPage">
          <AboutUs />
        </section>
        <section id="contactFormPage">
          <ContactForm />
        </section>
      </div>
    </>
  );
}

export default Home;
