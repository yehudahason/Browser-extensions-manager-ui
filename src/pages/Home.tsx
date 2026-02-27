import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { type CardsArray } from "../types/types";
const Home = () => {
  const base = import.meta.env.BASE_URL;

  const [allCards, setAllCards] = useState<CardsArray>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const themeToggle = () => {
    document.body.classList.toggle("dark");
  };
  // 🔥 Toggle by name (stable identity)
  const toggleCard = (name: string | undefined) => {
    setAllCards((prev) =>
      prev.map((card) =>
        card.name === name ? { ...card, isActive: !card.isActive } : card,
      ),
    );
  };
  const removeCard = (name: string | undefined) => {
    setAllCards((prev) => prev.filter((card) => card.name !== name));
  };
  // 🔥 Derived filtered data (NO duplicate state)
  const filteredCards = useMemo(() => {
    switch (activeFilter) {
      case "active":
        return allCards.filter((card) => card.isActive);
      case "inactive":
        return allCards.filter((card) => !card.isActive);
      default:
        return allCards;
    }
  }, [allCards, activeFilter]);

  // 🔥 Fetch once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base}/data.json`);
        const data = await response.json();
        setAllCards(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [base]);

  return (
    <main className="main">
      <header className="top-nav">
        <div className="brand">
          <img
            className="logo-light"
            src={`${base}assets/images/logo.svg`}
            alt="Extensions logo"
          />
          <img
            className="logo-dark"
            src={`${base}assets/images/logo-white.svg`}
            alt="Extensions logo"
          />
        </div>

        <button
          className="theme-toggle"
          aria-label="Toggle theme"
          onClick={themeToggle}
        >
          <img
            src={`${base}assets/images/icon-moon.svg`}
            alt=""
            className="moon-icon"
          />
          <img
            src={`${base}assets/images/icon-sun.svg`}
            alt=""
            className="sun-icon"
          />
        </button>
      </header>

      <section className="secondary-nav">
        <span className="section-title">Extensions List</span>

        <ul className="filter-list">
          <li>
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${activeFilter === "active" ? "active" : ""}`}
              onClick={() => setActiveFilter("active")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${activeFilter === "inactive" ? "active" : ""}`}
              onClick={() => setActiveFilter("inactive")}
            >
              Inactive
            </button>
          </li>
        </ul>
      </section>

      <div className="container">
        {filteredCards.map((card) => (
          <Card
            key={card.name}
            logo={card.logo}
            name={card.name}
            description={card.description}
            isActive={card.isActive}
            onToggle={toggleCard}
            onRemove={removeCard}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
