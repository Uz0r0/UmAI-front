import './../../App.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import searchIcon from './../../assets/searchIcon.png';
import burgerIcon from './../../assets/burger.png';
import logo from './../../assets/logo.png';
import Back from './../../assets/Back.png';
import Next from './../../assets/Next.png';
import Symbvol from './../../assets/Symbvol.png';

function MainPage() {
    const books = [
        { id: 1, title: "Сынган кылыч"},
        { id: 2, title: "Манас"},
        { id: 3, title: "Биринчи мугалим"},
        { id: 4, title: "Кожожаш"},
        { id: 5, title: "Ак Кеме"},
        { id: 6, title: "Кылым карытар бир кун",},
        { id: 7, title: "Жамиля"},
        { id: 8, title: "Ромео жана Джульетта"},
        { id: 9, title: "Согуш жана тынчтык"},
        { id: 10, title: "Евгегий Онегин"},
    ];

    const { bookId, chapter } = useParams();
    const navigate = useNavigate();

    const [active, setActive] = useState(() => Number(bookId) || books[0].id);
    const [page, setPage] = useState(() => Number(chapter) || 1);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const url = `/works/${active}/pages/${page}`;
        if (window.location.pathname !== url) {
            navigate(url, { replace: true });
        }
    }, [active, page, navigate]);   

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:8001/works/${Number(active)}/pages/${Number(page)}`
                );
                if (res.data && res.data.text) {
                    setContent(res.data.text);
                } else {
                    setContent("Бул бөлүм үчүн эч кандай текст жок.");
                }
            } catch (err) {
                console.error(err); 
                setContent("Баракты жүктөө катасы");
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [active, page]);

    const handleBookClick = (id) => {
        setActive(id);   
        setPage(1);
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
                <div className="tittle">
                    {books.find(book => book.id === active)?.title}
                </div>
                {loading ? (
                    <p>Жүктөө...</p>
                ) : (
                    <div>
                        <div className='content' style={{ whiteSpace: "pre-line" }}>
                            <p>{content}</p>
                        </div>
                        <div className='page-control'>
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page <= 1}    
                                className={sidebarOpen ? "left-btn shifted" : "left-btn"}
                            >
                                <img src={Back} alt="" className='back'/>
                            </button>

                            <button
                                onClick={() => setPage(page + 1)}
                                className="right-btn"
                            >
                                <img src={Next} alt="" className='next'/>
                            </button>
                        </div>
                    </div>
                )}
                <div className='bottom'>
                    <p className='number'>{page}</p>
                </div>
            </main>
        </div>  
    )
}

export default MainPage;

