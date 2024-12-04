import { Header } from "@/components/Header"
import HomeInf from "@/components/Home";
import Introducao from "@/components/Home/intro";


const Home = () => {
    return (
        <><div>
            <Header/>



            {/* teu codigo daqui pra baixo*/}

            <div className="mt-16">
                <Introducao/>

                <HomeInf/>
                
                

            </div>
        </div>
        </>
        
    )
}
export default Home;