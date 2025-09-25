import './../../App.css';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TextArea from '../../components/TextArea/TextArea';
import burgerIcon from './../../assets/burger.png';
import searchIcon from './../../assets/searchIcon.png';
import Symbvol from './../../assets/Symbvol.png';
import logo from './../../assets/logo.png';
import Arrow from './../../assets/Arrow.png';

function AIPage() {
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
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ); 

    const handleAsk = async () => {
        if (!question.trim()) return;

        setLoading(true);
        
        setMessages(prev => [...prev, { role: "user", text: question }]);
        setQuestion("");  

        try {
            const res = await fetch(
            `http://localhost:8001/ask-ai/?question=${encodeURIComponent(question)}`,
            {
                method: "GET",
                headers: {
                "Accept": "application/json",
                },
            }
            );

            if (!res.ok) throw new Error("Сурам катасы");

            const data = await res.json();
            setMessages(prev => [...prev, { role: "ai", text: data.ai_answer.answer }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "ai", text: "Ката: " + err.message }]);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (id) => {
        setActive(id);   
        setPage(1);
        navigate(`/works/${id}/pages/1`);
    };

    return (
    <>
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
                    <button className='Uami-suroo'><img src={Symbvol} alt="" />UmAI суроо</button>
                </div>
            </nav>
            <main>
                <div className={`input-Ai ${sidebarOpen ? "shifted" : ""}`}>
                    <div className='welcome'>
                        <img src={logo} alt="logo" className='LogoImg'/>
                        <h3> Кантип жардам бере алам? </h3>
                    </div>
                    <div className="chat-history">
                        {messages.map((msg, i) => (
                            <p key={i} className={msg.role === "user" ? "user-msg" : "ai-msg"}>
                                <strong>{msg.role === "user" ? "Сиз:" : "AI:"}</strong> {msg.text}
                            </p>
                        ))}
                        {loading && <p>Жүктөлүүдө...</p>}
                    </div>
                    <div className="input-wrapper">
                        <TextArea
                            placeholder="Cуроону жазыңыз..."
                            value={question}
                            onChange={(e) => {
                                setQuestion(e.target.value);
                            }}
                            rows={1}
                            onEnter={handleAsk}
                        />
                        <button className="askButton"  onClick={handleAsk} disabled={loading}><img src={Arrow} alt="" /></button>
                     </div>
                </div>
            </main>
        </div>
    </>
  );
}

export default AIPage;