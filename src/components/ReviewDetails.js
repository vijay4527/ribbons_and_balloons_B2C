// import React from "react";
// import styles from "../pages/[city]/p/Review.module.css";
// import { useState } from "react";

// const ReviewDetails = () => {
//     const [selectedTab, setSelectedTab] = useState("Review");

//     const handleTabChange = (tabName) => {
//         setSelectedTab(tabName);
//     };

//     return (
//         <div>
//             <div className={styles.tabsLinksReview}>
//                 <ul className={styles.tabsLinkReview}>
//                     <li className={`${styles.reviewWraper} ${selectedTab === "Review" ? styles["active"] : ""}`}
//                         onClick={() => handleTabChange("Review")}>
//                         <h4>Review</h4>
//                     </li>
//                     <li className={`${styles.reviewWraper} ${selectedTab === "Description" ? styles["active"] : ""}`}
//                         onClick={() => handleTabChange("Description")}>
//                         <h4>Description</h4>
//                     </li>
//                 </ul>
//                 <div className={styles.tabsContentReview}>
//                     <div className={`${styles["tabsContent"]} ${selectedTab === "Review" ? styles["show"] : ""}`}>
//                         <div className={styles.tabsBody}>
//                             <h4 className={styles.reviewCounts}>1 REVIEW FOR ORANGE TWIST</h4>
//                             <ul className={styles.reviewContentInfo}>
//                                 <li className={styles.reviewDesc}>
//                                     <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/blog-user-img-2-1-100x100.jpg" alt="review" />
//                                     <div className={styles.reviewInfo}>
//                                         <div className={styles.reviewStart}>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
//                                                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
//                                                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
//                                                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
//                                                     <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
//                                                     <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
//                                                 </svg>
//                                             </span>
//                                         </div>
//                                         <h4>ANNA WILSON <span>– October 24, 2018</span></h4>
//                                         <p>Great & tasty!</p>
//                                     </div>
//                                 </li>
//                                 <li className={styles.reviewDesc}>
//                                     <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/blog-user-img-2-1-100x100.jpg" alt="rewview description" />
//                                     <div className={styles.reviewInfo}>
//                                         <div className={styles.reviewStart}>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
//                                                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
//                                                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
//                                                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
//                                                     <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
//                                                 </svg>
//                                             </span>
//                                             <span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
//                                                     <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
//                                                 </svg>
//                                             </span>
//                                         </div>
//                                         <h4>ANNA WILSON <span>– October 24, 2018</span></h4>
//                                         <p>Great & tasty!</p>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className={`${styles["tabsContent"]} ${selectedTab === "Description" ? styles["show"] : ""}`}>
//                         <div className={styles.tabsBody}>
//                             <p>
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque viverra mauris in aliquam. Ullamcorper malesuada proin libero nunc consequat. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Massa enim nec dui nunc mattis enim ut tellus elementum. Suscipit tellus mauris a diam maecenas nisi vitae.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewDetails;
