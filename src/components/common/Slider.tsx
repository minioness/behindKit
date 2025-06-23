
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./Slider.module.css";

import banner1 from "../../assets/img/banners/bannerImg-1.png";
import banner2 from "../../assets/img/banners/bannerImg-2.png";
import banner3 from "../../assets/img/banners/bannerImg-3.png";

const Slider = () => {
  const items = [
    {
      name: "productivity-tools",
      title: "생산성 향상을 위한 스마트 도구",
      text: "계획부터 실행까지, 효율적인 하루를 만들어보세요.",
      img: banner1,
    },
    {
      name: "template-gallery",
      title: "감각적인 디자인 템플릿",
      text: "간결하고 트렌디한 템플릿으로 더 멋지게 기록해보세요.",
      img: banner2,
    },
    {
      name: "creator-workflow",
      title: "크리에이터의 워크플로우 정립",
      text: "나만의 콘텐츠 제작 루틴을 만들어보세요.",
      img: banner3,
    },
  ];

  return (
    <Carousel
      autoPlay
      showThumbs={false}
      interval={5000}
      showStatus={false}
      infiniteLoop
      className={styles.carouselContainer}
    >
      {items.map((item) => (
        <div key={item.name} className={styles.carouselSlide}>
          <div className={styles.carouselDescription}>
            <h2 className={styles.carouselTitle}>{item.title}</h2>
            <p className={styles.carouselText}>{item.text}</p>
          </div>
          <img src={item.img} alt={item.name} className={styles.carouselImage} />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
