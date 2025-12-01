// react
import { useRef } from "react";

// gsap
import gsap from "gsap";

// dataset
import { dataset } from "./assets/data/data"

// img
import actionBtnImg from './assets/pics/nextprevious.png';


function App() {

    let firstDrag = 0;
    const pagesRef = useRef([]);


    const flipAnimation = (element, rotateY) => {
      const isFirstLast = (element.style.zIndex == 1 || element.style.zIndex == dataset.length)
      element.classList.toggle("dragged")
      gsap.to(element, {
        transformOrigin: 'center left',
        rotateY,
        duration: isFirstLast ? 3 : 0.3,
        ease: isFirstLast ? "elastic" : "sine.inOut"
      })
      element.style.zIndex = dataset.length - element.style.zIndex + 1;
    }

    const handleDragStart = (e) => {
      firstDrag = e.clientX;
    }

    const handleDragEnd = (e) => {
        flipAnimation(
          e.target,
          e.clientX < firstDrag ? 180 : 0
        )
    }

    const isDragged = (element) => {
      return element.classList.contains("dragged")
    }

    const goNextByBtn = () => {
      const notebook = pagesRef.current;
      for(let index in notebook) {
        if( index == notebook.length -1 && !isDragged(notebook[index]) ) {
          flipAnimation(notebook[index], 180);
          break;
        }
        else {
          if(isDragged(notebook[index])) {
            flipAnimation(notebook[index - 1], 180);
            break;
          }
        }
      }
    }

    const goPreviousByBtn = () => {
      const notebook = pagesRef.current;
      for(let index in notebook) {
        if( index == 0 && isDragged(notebook[index]) ) {
          flipAnimation(notebook[index], 0);
          break;
        }
        else {
          if(isDragged(notebook[index])) {
            flipAnimation(notebook[index], 0);
            break;
          }
        }
      }
    }

    const handleClick = (status) => {
      if(status === 'next') {
        goNextByBtn();
      }
      else {
        goPreviousByBtn();
      }
    }

    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <div className="bookContainer w-[150px] h-[150px] lg:w-[300px] lg:h-[300px]">
          {
            dataset.map((item, index) => {
              return (
                <div 
                  ref={(e) => pagesRef.current[index] = e}
                  key={item.zIndex}
                  className="w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] imgRatio"
                  style={{backgroundImage: `url(${item.pic})`, zIndex: item.zIndex}}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                >
                </div>
              )
            })
          }
        </div>

        <button onClick={() => handleClick('next')} className="actionBtn actionBtn_next">
          <img width='100%' src={actionBtnImg} />
        </button>

        <button onClick={() => handleClick('previous')} className="actionBtn actionBtn_previous">
          <img width='100%' src={actionBtnImg} />
        </button>
      </div>
    )
}

export default App