import "./Home.scss";
import Header from "../../components/Header";
import QuestionItemList from "../../components/QuestionItemList";
import SideBar from "../../components/SideBar";
import { useRef } from "react";

const Home = () => {
    return (
        <div id="home-wrapper">
            <Header />
            <QuestionItemList />
            <SideBar />
        </div>
    ) 
}

export default Home;