import React from "react";
import Image from "next/image";

type RoundProfilePictureProps = { imageSrc: any; altText?: string };

const RoundProfilePicture: React.FC<RoundProfilePictureProps> = ({
  imageSrc,
  altText,
}) => {
  return (
    <Image
      style={{ borderRadius: "50%", overflow: "hidden" }}
      width={30}
      height={30}
      src={imageSrc}
      alt={altText || "Profile Picture"}
    />
  );
};
export default RoundProfilePicture;
