import { useEffect, useState } from "react";
import Card from "../components/Card";
import { type CardsArray } from "../types/types";
const Home = () => {
  const base = import.meta.env.BASE_URL;
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [data, setData] = useState<CardsArray>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const toggleCard = (index: number) => {
    setData((prevData) =>
      prevData.map((card, i) =>
        i === index ? { ...card, isActive: !card.isActive } : card,
      ),
    );
  };
  const filterCards = (filter: string) => {
    setActiveFilter(filter);
    switch (filter) {
      case "active":
        setData(allCards.filter((card) => card.isActive));
        break;
      case "inactive":
        setData(allCards.filter((card) => !card.isActive));
        break;
      default:
        setData(allCards);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base}/data.json`);
        const data = await response.json();
        setData(data);
        setAllCards(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="main">
      <header className="top-nav">
        <div className="brand">
          <img src={`${base}assets/images/logo.svg`} alt="Extensions logo" />
        </div>

        <button className="theme-toggle" aria-label="Toggle theme">
          <img src={`${base}assets/images/icon-moon.svg`} alt="" />
        </button>
      </header>

      <section className="secondary-nav">
        <span className="section-title">Extension List</span>

        <ul className="filter-list">
          <li>
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => filterCards("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${activeFilter === "active" ? "active" : ""}`}
              onClick={() => filterCards("active")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${activeFilter === "inactive" ? "active" : ""}`}
              onClick={() => filterCards("inactive")}
            >
              Inactive
            </button>
          </li>
        </ul>
      </section>

      <div className="container">
        {data.map((card, index) => (
          <Card
            key={index}
            logo={card.logo}
            name={card.name}
            description={card.description}
            isActive={card.isActive}
            index={index}
            onToggle={toggleCard}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
