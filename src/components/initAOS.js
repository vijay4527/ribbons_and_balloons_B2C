import AOS from 'aos';
import 'aos/dist/aos.css';

const initAOS = () => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out', 
    once: true 
   });
};

export default initAOS;
