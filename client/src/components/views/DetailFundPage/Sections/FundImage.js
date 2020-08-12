import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function FundImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.map((item) => {
        images.push({
          //로컬
          // original: `http://localhost:5000/${item}`,
          // thumbnail: `http://localhost:5000/${item}`,

          //ec2
          original: `http://ec2-52-78-141-209.ap-northeast-2.compute.amazonaws.com:5000/${item}`,
          thumbnail: `http://ec2-52-78-141-209.ap-northeast-2.compute.amazonaws.com:5000/${item}`,
        });
      });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default FundImage;
