import logo from './logo.svg';
import { useState,useRef ,useEffect} from 'react';
import './App.css';
const testmonials=[
    {
      name:"Yatin B Singla",
      country:"India",
      city:"Hyderabad",
      content:"“The best cost cutting solution for my recruitment. Screened candidates help me find right candidates for all my jobs. The ATS system is so user friendly  yet robust. Thanks Talentinio Team”",
      logo:"https://www.talentinio.com/assets/images/testimonials/author-2.jpg"
    },
    {
      name:"Yatin B Singla",
      country:"India",
      city:"Hyderabad",
      content:"“The best cost cutting solution for my recruitment. Screened candidates help me find right candidates for all my jobs. The ATS system is so user friendly  yet robust. Thanks Talentinio Team”",
      logo:"https://www.talentinio.com/assets/images/testimonials/author-2.jpg"
    },
    {
      name:"Yatin B Singla",
      country:"India",
      city:"Hyderabad",
      content:"“The best cost cutting solution for my recruitment. Screened candidates help me find right candidates for all my jobs. The ATS system is so user friendly  yet robust. Thanks Talentinio Team”",
      logo:"https://www.talentinio.com/assets/images/testimonials/author-2.jpg"
    },
    {
      name:"Yatin B Singla",
      country:"India",
      city:"Hyderabad",
      content:"“The best cost cutting solution for my recruitment. Screened candidates help me find right candidates for all my jobs. The ATS system is so user friendly  yet robust. Thanks Talentinio Team”",
      logo:"https://www.talentinio.com/assets/images/testimonials/author-2.jpg"
    },
    {
      name:"Yatin B Singla",
      country:"India",
      city:"Hyderabad",
      content:"“The best cost cutting solution for my recruitment. Screened candidates help me find right candidates for all my jobs. The ATS system is so user friendly  yet robust. Thanks Talentinio Team”",
      logo:"https://www.talentinio.com/assets/images/testimonials/author-2.jpg"
    },
    {
      name:"kumar sai",
      country:"India",
      city:"Hyderabad",
      content:"“The best cost cutting solution for my recruitment. Screened candidates help me find right candidates for all my jobs. The ATS system is so user friendly  yet robust. Thanks Talentinio Team”",
      logo:"https://www.talentinio.com/assets/images/testimonials/author-2.jpg"
    },

]
function App() {
  const cardsRef=useRef(null);
  const intervalRef=useRef(null);
  const [slide,setslide]=useState(0);
  const [prevslide,setprevslide]=useState(0);
  const [Translate, setTranslate] = useState(0); 
  const [first,setfirst]=useState(false);
   const [manual,setmanual]=useState(false);
  const setslideInterval=()=>{
    clearsetinterval()
    intervalRef.current=setInterval(()=>{
      setslide((slide)=>{
        if(slide<testmonials.length-2){
          
        
          setmanual(true);
        return (slide+1) % (testmonials.length);
        
   }
   else if (slide>=testmonials.length-2){
    setprevslide(0);
    setmanual(true);
    return 0;
   }
      }
    )
    
  },
  3000)
  }
  const clearsetinterval=()=>{
    
       clearInterval(intervalRef.current);

    
  }

  
  useEffect(()=>{
     
    setslideInterval();
     
   
  return clearsetinterval;
  

  },[])
  const scrollToLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollLeft = 0; 
    }
  };
  useEffect(()=>{
if(slide===0 && manual){
setTimeout(() => {
  scrollToLeft();
}, 1500);
  
}
  },[slide])
  const handleScroll = () => {

    const container = cardsRef.current;
    const cards = container.children; // Get all the card elements
    const containerWidth = container.clientWidth;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardRect = card.getBoundingClientRect();
      console.log(cardRect.left,cardRect.right,i,containerWidth)
      // Check if card is within the visible area of the container
      if (
        cardRect.left >= 0 && // Card is to the right of the left edge of the container
        cardRect.right <= containerWidth  // Card is to the left of the right edge of the container
      ) {
        
        setmanual(false);
        clearsetinterval();
        if(i<=testmonials.length-2){
        console.log(i)
        setprevslide(i);
        setTranslate(-108 * i); 
        setslide(i);
       
        }
        console.log(testmonials.length)
        setslideInterval() // Update the index of the visible card
        break; // Exit loop if the card is found
      }
    }
  };

  useEffect(()=>{
    console.log("slide changed",slide);
    console.log("prevslide",prevslide);
    console.log("manual change",manual);

  },[slide,manual])
  useEffect(()=>{
    if(first){
      console.log("first")
      console.log(first,prevslide,slide);
    }
  },[first])

  useEffect(() => {
    const container = cardsRef.current;

    // Attach scroll event listener
    container.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove the listener on unmount
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<div className='testimonials-wrapper'>
<div className='testimonials'>
  <div className='header'>Testimonials</div>
  <div className='subheader'>What Our <span className='changecolor'>C</span>lients <span className='changecolor'>S</span>ay</div>
  <div className='cards'   
 ref={cardsRef}>
    { testmonials.map((onecard,index)=>(
      
      <div className='card'   style={manual ?{translate:`${slide===0?-108*0-Translate:`${(-108*(slide-prevslide))}` }%`}:{translate:"none"}}     key={index}>
        <div className='front-card'>
        
        <div className='upper-card'>
          <div className='imagewrapper'>
            <div className='image2'>
              <img className='logo' src={onecard.logo} alt={onecard.name}></img>
            </div>
            <div className='namecard'>
              <div className='name'>{onecard.name}</div>
              <div className='location'>{onecard.city+ " , "+onecard.country+ " "+index}</div>
              </div>

          </div>
          <img src="/quotation (1).png" className='doublequotes'/>
        </div>
        <div className='text'>
          {onecard.content}
        </div>
        </div>
        <div className='backgroundcard'>

          </div>
      </div>
  
    ))

    }
  </div>
</div>
</div>
  );
}

export default App;
