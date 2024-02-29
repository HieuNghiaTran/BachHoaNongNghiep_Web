
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Chat from './components/layout/chat'
import Sliders from './components/layout/slider';
import Sidebar from './components/layout/sidebar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (

    <>
      <div className='wrapper'>
        <Header />
        <main>
          <div className='top-main d-flex position-relative'>
            <Sidebar />
            <Sliders />
          </div>


          <Chat />
        </main>





      </div>

      




    </>

  )

}

export default App;
