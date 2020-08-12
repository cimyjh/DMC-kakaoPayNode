import React from "react";
import { Icon, Col, Card, Row, Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "100%" }}
              src={`http://ec2-52-78-141-209.ap-northeast-2.compute.amazonaws.com:5000/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
