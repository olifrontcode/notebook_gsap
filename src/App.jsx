import gsap from "gsap";
import { dataset } from "./assets/data/data"

function App() {

    let firstDrag = 0;

    const handleDragStart = (e) => {
      firstDrag = e.clientX;
    }

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

    const handleDragEnd = (e) => {
        if(e.clientX < firstDrag) {
          flipAnimation(e.target, 180)
        }
        else {
          flipAnimation(e.target, 0)
        }
    }


    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <div className="bookContainer w-[150px] h-[150px] lg:w-[300px] lg:h-[300px]">
          {
            dataset.map(item => {
              return (
                <div 
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
      </div>
    )
}

export default App
