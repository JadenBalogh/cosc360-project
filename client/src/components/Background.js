import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Background(props) {

  const bounceBalls = (targets) => {
    gsap.utils.toArray(targets).forEach((ball, index) => {
      gsap.to(ball, {
        y: Math.random() < 0.5 ? -1 * (Math.random() * 2 + 2.5) * 3 : (Math.random() * 2 + 2.5) * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine",
        duration: 5
      });
    });
  }

  const ball1Ref = useRef(), ball2Ref = useRef(), ball3Ref = useRef(), bgRef = useRef();
  const {animateBall1} = ball1Ref;
  const {animateBall2} = ball2Ref;
  const {animateBall3} = ball3Ref;
  const {animateBg} = bgRef;
  useEffect(() => {
    bounceBalls([ball1Ref.current, ball2Ref.current, ball3Ref.current]);
  }, [animateBall1, animateBall2, animateBall3, animateBg]);

  return (
    <div className='flex items-center justify-center overflow-hidden hidden lg:block'>
      <div
        className='w-64 h-64 bg-gradient-to-tl from-purple-400 to-red-500 rounded-full fixed left-96 filter blur-md'
        style={{zIndex: -100, top: "50rem"}} ref={ball1Ref}/>
      <div
        className='w-48 h-48 bg-gradient-to-tl from-purple-400 to-red-500 rounded-full fixed right-72 top-64 filter blur-md'
        style={{zIndex: -100}} ref={ball2Ref}/>
      <div
        className='w-24 h-24 bg-gradient-to-tl from-purple-400 to-red-500 rounded-full fixed left-72 top-32 filter blur-md'
        style={{zIndex: -100}} ref={ball3Ref}/>
    </div>
  );
}

export default Background;