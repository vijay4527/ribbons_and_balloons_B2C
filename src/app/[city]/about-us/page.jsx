import React from "react";
import styles from "@/app/[city]/terms-and-condition/page.module.css";

export const metadata = {
  title: "About Us | Ribbons and Balloons",
  description: "This is the description",
};
const page = () => {
  return (
    <div>
      <div className="container">
        <div className={styles.quote}>
          Ribbons and Balloons- A Sweet Tradition of Serving Joy
        </div>
        <p>
          In our country Success and Happiness always Begins With a Sweet Note.
          So to fulfill this beautiful tradition Ribbons and Balloons has been
          there for its customers since 2005. Straight from the ovens of the
          finest bakery, we bring you the fresh taste of goodness. Here, you get
          a wide choice of rich delicious Pastries, Birthday Cakes, Custom and
          Fancy Cakes for all occasion, Tea Cakes, Puffs, Rolls, Sandwiches… &
          more.
        </p>
        <p>
          Leading and growing strongly with around 100 stores in Mumbai and Pune
          our growth has been an inspiring success story to tell. We have
          accomplished all this through our closely understanding of our
          customer needs, excellent products, state of the art manufacturing,
          motivated employees, efficient supply chain management and satisfied
          franchise partners. Our expansion plan in the coming years is to
          create our presence in all the cities Pan India.
        </p>
        <p>With Ribbons and Balloons the Party Never Stops!!</p>
      </div>
      <div className="container">
        <div className={styles.quote}>
          A visionary, a business tycoon, a leader
        </div>
        <p>
          Meet Satish V Shetty. The man who has a series of firsts to his
          credit. With astounding contribution in a diverse spectrum of sectors,
          he is known for his pioneering initiatives in food industry. A retail
          chain of cake shops dedicated to cakes, pastries, cookies, deserts is
          his brainchild. He is the Chairman & Managing Director, leading the
          Executive team of Yaash Krishni Group of Companies which is
          responsible for directing company’s strategy, planning and operations.
          It's his vision & hard work behind the tremendous success and rapid
          geographical expansion of Ribbons and Balloons brand since 2005.
        </p>
        <p>
          His career spans more than 25 years in various aspects of business and
          corporate. He has been the strategy leader in organizational capacity
          building both internal and external in terms of building a large
          portfolio of dedicated franchise partnership, alliance, suppliers and
          customers. He also oversees the design thinking for continuous
          innovation and change to drive further growth, increasing scale of
          production and value for money for the customers. As an enthusiastic
          and passionate leader leading the vision and direction of the Company
          for new ventures.
        </p>
      </div>
      <div className="container">
        <div className={styles.quote}>Vision Statement</div>
        <p>
          To be a world class organization committed to delight our nation wide
          customers by creating happy memorable moments in their lives through
          our line of products.
        </p>
      </div>
      <div className="container">
        <div className={styles.quote}>Mission Statement</div>
        <p>
          Provide professional and courteous service to our customers with
          highest standard of freshness, quality and product value. Constantly
          focus and evolve through innovation and cutting edge technology for
          superior product line. Establish beneficial relationship with our
          customers, supplier and franchised operations. Provide an exceptional
          and memorable experience for our customers through our graciousness,
          professionalism, integrity, service and products. Contribute to the
          society through our profits.
        </p>
        
      </div>
    
    </div>
  );
};

export default page;
