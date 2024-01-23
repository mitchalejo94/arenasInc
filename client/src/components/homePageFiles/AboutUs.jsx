import React from "react";
import { Divider, Image } from "antd";

function AboutUs() {
  let textStyle = {
    width: "100%",
    color: "black",
  };

  return (
    <>
      <Divider orientation="right">About Us</Divider>
      <p style={textStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.Dolor magna eget est lorem ipsum dolor sit.
        Et odio pellentesque diam volutpat commodo sed egestas egestas.
        Suspendisse sed nisi lacus sed. Blandit turpis cursus in hac habitasse
        platea dictumst quisque sagittis. Ac placerat vestibulum lectus mauris.
        Posuere urna nec tincidunt praesent semper feugiat nibh sed. Lectus sit
        amet est placerat in egestas erat imperdiet sed. Nunc sed augue lacus
        viverra vitae congue eu. Elementum tempus egestas sed sed risus pretium.
        Vestibulum lorem sed risus ultricies tristique nulla aliquet. Est velit
        egestas dui id ornare. Sodales ut eu sem integer. Eros donec ac odio
        tempor orci dapibus ultrices. Auctor neque vitae tempus quam
        pellentesque. Proin sagittis nisl rhoncus mattis rhoncus urna neque
        viverra. Purus gravida quis blandit turpis. Et malesuada fames ac turpis
        egestas integer eget aliquet.
      </p>
      <Divider orientation="left">More About us</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Consectetur
        adipiscing elit ut aliquam purus. Enim sed faucibus turpis in eu. Turpis
        egestas maecenas pharetra convallis posuere morbi leo. Elementum nisi
        quis eleifend quam. Elit ullamcorper dignissim cras tincidunt lobortis
        feugiat vivamus at augue. Odio euismod lacinia at quis risus sed
        vulputate odio. Egestas sed sed risus pretium quam vulputate dignissim
        suspendisse. Lorem mollis aliquam ut porttitor leo a. Integer enim neque
        volutpat ac tincidunt vitae semper quis lectus. Sociis natoque penatibus
        et magnis dis parturient montes. Mauris in aliquam sem fringilla ut
        morbi. Hac habitasse platea dictumst quisque sagittis purus sit. Fames
        ac turpis egestas integer. Cursus vitae congue mauris rhoncus aenean.
        Tellus id interdum velit laoreet. Elementum integer enim neque volutpat
        ac tincidunt vitae semper quis. Rhoncus est pellentesque elit
        ullamcorper dignissim cras tincidunt. Vestibulum morbi blandit cursus
        risus at. Pharetra sit amet aliquam id diam maecenas. Arcu dui vivamus
        arcu felis bibendum ut tristique et egestas. Sed faucibus turpis in eu
        mi bibendum neque. Dui ut ornare lectus sit amet est placerat in. Sem et
        tortor consequat id porta nibh venenatis. Eu ultrices vitae auctor eu
        augue ut lectus. Ullamcorper malesuada proin libero nunc. Aliquam
        ultrices sagittis orci a scelerisque. Commodo elit at imperdiet dui
        accumsan sit. Sed euismod nisi porta lorem mollis aliquam ut porttitor.
      </p>

      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        <Image
          width={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <Image
          width={200}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </Image.PreviewGroup>
    </>
  );
}

export default AboutUs;
