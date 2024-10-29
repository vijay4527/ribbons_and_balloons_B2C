import React from "react";
import Container from "react-bootstrap/Container";
async function getLongToken() {
  try {
    const accessToken = process.env.INSTAGRAM_KEY;
    
    const liveLongToken = await fetch(`https://graph.instagram.com/access_token
 ?grant_type=ig_exchange_token
 &client_secret=a48e75c2da6b188408469129f74ed035
 &access_token=${accessToken}`);
    if (liveLongToken) {
      const token = await liveLongToken.json();

      if (token.error) {
        console.log(token);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
async function getInstaFeed() {
  try {
    const accessToken = process.env.INSTAGRAM_KEY;
    const fetchData = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&access_token=${accessToken}`
    );
    if (fetchData) {
      const posts = await fetchData.json();
      const filteredVideo = posts.data.filter(
        (ele) => ele.media_type === "VIDEO"
      );
      const filteredImage = posts.data.filter(
        (ele) => ele.media_type === "IMAGE"
      );
      return { filteredVideo, filteredImage };
      // return posts;
    }
  } catch (err) {
    console.log(err);
    return { filteredVideo: [], filteredImage: [] };
  }
}
const InstaPosts = async () => {
  const { filteredVideo, filteredImage } = await getInstaFeed();
  // const data = await getInstaFeed();
  const getToken = await getLongToken();
  return (
    <div className="advInstaWrap">
      <Container fluid>
        <div className="headerTitle">
          <h2>INSTAGRAM</h2>
          <div className="testimonialUnderLine">
            <div className="testimonialUnder">
              <div className="underLine"></div>
              <div className="shapLine"></div>
            </div>
          </div>
        </div>
        <div className="advInstaBody">
          <div className="advInstaContent2">
            {filteredImage && filteredImage.length > 0 && filteredImage[0] && (
              <>
                <div className="advInstaContentBox">
                  <div className="advInstaContentBoxImg">
                    <img
                      src={filteredImage[0].media_url}
                      alt="No image found"
                      rel="preload"
                    />
                  </div>
                  <div className="advInstaContentBoxHover">
                    <div className="advInstaContentBoxTrap">
                      <div className="advInstaContentBoxborder">
                        <div className="advInstaContentInfo">
                          <img src="" alt="No image found" rel="preload" />
                          <h3>Calisson</h3>
                          <p>$15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {filteredImage && filteredImage.length > 0 && filteredImage[1] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    src={filteredImage[1].media_url}
                    alt="No image found"
                    rel="preload"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" rel="preload" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filteredImage && filteredImage.length > 0 && filteredImage[2] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    src={filteredImage[2].media_url}
                    alt="No image found"
                    rel="preload"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" rel="preload" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filteredImage && filteredImage.length > 0 && filteredImage[3] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    src={filteredImage[3].media_url}
                    alt="No image found"
                    rel="preload"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" rel="preload" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="advInstaContent">
            {filteredVideo && filteredVideo.length > 0 && filteredVideo[0] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <video
                    src={filteredVideo[0].media_url}
                    alt="No image found"
                    rel="preload"
                    autoPlay
                    muted
                    controls={false}
                    loop
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="advInstaContent2">
            {filteredImage && filteredImage.length > 0 && filteredImage[4] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    src={filteredImage[4].media_url}
                    alt="No image found"
                    rel="preload"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" rel="preload" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filteredImage && filteredImage.length > 0 && filteredImage[5] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    src={filteredImage[5].media_url}
                    alt="No image found"
                    rel="preload"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filteredImage && filteredImage.length > 0 && filteredImage[6] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    src={filteredImage[6].media_url}
                    alt="No image found"
                    rel="preload"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" rel="preload" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filteredImage && filteredImage.length > 0 && filteredImage[7] && (
              <div className="advInstaContentBox">
                <div className="advInstaContentBoxImg">
                  <img
                    rel="preload"
                    src={filteredImage[7].media_url}
                    alt="No image found"
                  />
                </div>
                <div className="advInstaContentBoxHover">
                  <div className="advInstaContentBoxTrap">
                    <div className="advInstaContentBoxborder">
                      <div className="advInstaContentInfo">
                        <img src="" alt="No image found" rel="preload" />
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className='advInstaContent3'>
          <div className=''><h3>Where there is cake, there is hope. And there is always cake.</h3></div>
        </div> */}
        </div>
      </Container>
    </div>

    //   <div className="advInstaWrap">
    //   <Container fluid>
    //     <div className="headerTitle">
    //       <h2>INSTAGRAM</h2>
    //       <div className="testimonialUnderLine">
    //         <div className="testimonialUnder">
    //           <div className="underLine"></div>
    //           <div className="shapLine"></div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="advInstaBody">
    //       <div className="advInstaContent2">
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post1.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post3.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post2.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post4.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="advInstaContent">
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post5.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="advInstaContent2">
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post1.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post3.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               src="https://fama.b-cdn.net/RnB/post2.webp"
    //               alt="No image found"
    //               rel="preload"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="advInstaContentBox">
    //           <div className="advInstaContentBoxImg">
    //             <img
    //               rel="preload"
    //               src="https://fama.b-cdn.net/RnB/post4.webp"
    //               alt="No image found"
    //             />
    //           </div>
    //           <div className="advInstaContentBoxHover">
    //             <div className="advInstaContentBoxTrap">
    //               <div className="advInstaContentBoxborder">
    //                 <div className="advInstaContentInfo">
    //                   <img src="" alt="No image found" rel="preload" />
    //                   <h3>Calisson</h3>
    //                   <p>$15</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* <div className='advInstaContent3'>
    //       <div className=''><h3>Where there is cake, there is hope. And there is always cake.</h3></div>
    //     </div> */}
    //     </div>
    //   </Container>
    // </div>
  );
};

export default InstaPosts;
