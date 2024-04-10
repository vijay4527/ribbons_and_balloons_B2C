import AOS from 'aos';
import 'aos/dist/aos.css';

const initAOS = () => {
  AOS.init({
    // You can add configuration options here
    duration: 800, // Duration of animation
    easing: 'ease-in-out', // Easing for animation
    once: true // Whether animation should occur only once
    // Add more options as needed
  });
};

export default initAOS;
