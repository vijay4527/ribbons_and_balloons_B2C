import Container from "react-bootstrap/Container";
import AppConfig from "@/AppConfig";
import Link from "next/link";
import Image from "next/image";

const Banner = ({ city, data }) => {

  const firstImage = data.find((item) => item.seq_no === 1) || {};
  const secondImage = data.find((item) => item.seq_no === 2) || {};
  const thirdImage = data.find((item) => item.seq_no === 3) || {};
  const fourthImage = data.find((item) => item.seq_no === 4) || {};
  const fifthImage = data.find((item) => item.seq_no === 5) || {};


  return (
    <>
      <div className="banner-wrap">
        <Container fluid>
          <div className="banner-body">
            <div className="banner-sec1">
              <div
                className="banner-img banner-img1"
                id="animatedImage"
              >
               
                <Link href={`/${firstImage.redirect_url ? firstImage.redirect_url : "/"}`}>
                  <Image src={AppConfig.cdn+firstImage?.img_url} alt="No image found"  height={403} width={597} priority/>
                </Link>
              </div>
              <div
                className="banner-img banner-img2"
                id="animatedImage"
              >
              
                <Link href={`/${secondImage.redirect_url ? secondImage?.redirect_url : "/"}`}>
                <Image src={AppConfig.cdn+secondImage?.img_url} alt="No image found"  height={428} width={601} priority/>
                </Link>
              </div>
            </div>
            <div className="banner-sec1 banner-sec-center">
              <div
                className="banner-img banner-img-center"
                id="animatedImage"
              >
                
                <Link href={`/${thirdImage.redirect_url ? thirdImage.redirect_url : "/"}`}>
                <Image src={AppConfig.cdn+thirdImage?.img_url} alt="No image found"  height={629} width={931} priority/>
                </Link>
              </div>
            </div>
            <div className="banner-sec1">
              <div
                className="banner-img banner-img3"
                id="animatedImage"
              >
                
                <Link href={`/${fourthImage.redirect_url ? fourthImage.redirect_url: "/"}`}>
                <Image src={AppConfig.cdn+fourthImage?.img_url} alt="No image found"  height={403} width={596} priority/>

                </Link>
              </div>
              <div
                className="banner-img banner-img4"
                id="animatedImage"
              >
                
                <Link href={`/${fifthImage.redirect_url ? fifthImage.redirect_url : "/"}`}>
                <Image src={AppConfig.cdn+fifthImage?.img_url} alt="No image found"  height={428} width={633} priority/>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Banner;
