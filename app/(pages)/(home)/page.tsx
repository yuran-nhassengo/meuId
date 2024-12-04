import { Header } from "@/components/Header"
import HomeInf from "@/components/Home";
import Filtronav from "@/components/Home/filtronav";
import Introducao from "@/components/Home/intro";


const Home = () => {
    return (
        <><div>
            <Header/>



            {/* teu codigo daqui pra baixo*/}
            <div>
                <div>
                    <Introducao/>
                 </div>
                <HomeInf/>
                
                

            </div>
        </div>
        </>
        
    )
}
export default Home;