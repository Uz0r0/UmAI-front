import './../../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from './../../assets/searchIcon.png';
import burgerIcon from './../../assets/burger.png';
import Singan from './../../assets/Singan.png';
import Manas from './../../assets/Manas.png';
import First from './../../assets/First.png';
import Kojojash from './../../assets/Kojojash.png';
import AkKeme from './../../assets/AkKeme.png';
import BirKun from './../../assets/BirKun.png';
import Djamila from './../../assets/Djamila.png';
import Romeo from './../../assets/Romeo.png';
import War from './../../assets/War.png';
import Evgeniy from './../../assets/Evgeniy.png';
import logo from './../../assets/logo.png';
import Symbvol from './../../assets/Symbvol.png';
import Start from '../../components/Start/Start';
import Card from '../../components/Card/Card';

function StartPage() {  
    const navigate = useNavigate();
    const books = [
        { id: 1, title: "Сынган кылыч", img: Singan, autor: "Тологон Касымбеков" },
        { id: 2, title: "Манас", img: Manas, autor: "Эпос" },
        { id: 3, title: "Биринчи мугалим", img: First, autor: "Чынгыз Айтматов" },
        { id: 4, title: "Кожожаш", img: Kojojash, autor: "Эпос" },
        { id: 5, title: "Ак Кеме", img: AkKeme, autor: "Чынгыз Айтматов" },
        { id: 6, title: "Кылым карытар бир кун", img: BirKun, autor: "Чынгыз Айтматов" },
        { id: 7, title: "Жамиля", img: Djamila, autor: "Чынгыз Айтматов" },
        { id: 8, title: "Ромео жана Джульетта", img: Romeo, autor: "Уильям Шекспир" },
        { id: 9, title: "Согуш жана тынчтык", img: War, autor: "Лев Толстой" },
        { id: 10, title: "Евгегий Онегин", img: Evgeniy, autor: "Александр Пушкин" },
    ];

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [active, setActive] = useState(null);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBookClick = (id) => {
        setActive(id);
        navigate(`/works/${id}/pages/1`);
    };


    return (
        <div className={`body ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <nav id="sidebar" className={sidebarOpen ? "open" : "closed"}>
                <div className="sidebar-top">
                    <div className='visible'>
                        <button 
                            id="toggle-btn" 
                            className={`burger ${sidebarOpen ? "shifted" : ""}`}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                            <img src={burgerIcon} alt="menu" />
                        </button> 
                        <img src={logo} alt="logo" className='LogoImg' onClick={() => {navigate(`/`)}}/>
                    </div>                     
                    <div className={`search ${sidebarOpen ? "show" : "hide"}`}>    
                        <button>
                            <img src={searchIcon} alt="search" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Издоо" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </div>
                </div>
                <ul className={`book-list ${sidebarOpen ? "show" : "hide"}`}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <li key={book.id}>
                                <button 
                                    className={`book-btn ${active === book.id ? "active" : ""}`} 
                                    onClick={() => handleBookClick(book.id)}
                                >
                                    {book.title}
                                </button>
                            </li>
                        ))
                    ) : (
                        <li><p className="error">Эч нерсе табылган жок</p></li>
                    )}
                </ul>
                <div className={`umai ${sidebarOpen ? "show" : "hide"}`}>
                    <button className='Uami-suroo' onClick={() => {navigate(`/umai`)}}><img src={Symbvol} alt="" />UmAI суроо</button>
                </div>
            </nav>
            <main>
                <div className='header'>
                    <Start />
                </div>
                <div className='cards'>
                    {books.map(book => (
                        <Card
                        key={book.id}
                        img={book.img}
                        name={book.title}
                        autor={book.autor}
                        onClick={() => handleBookClick(book.id)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default StartPage;
