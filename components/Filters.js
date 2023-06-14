"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Filters({ channels, setSearchQuery, onSearch, searchQuery, onThemeFilter,onLangFilter }) {
  const [themes, setThemes] = useState([]);
  const [lang, setLang] = useState([]);

  useEffect(() => {

    const uniqueThemes = Array.from(
      new Set(channels.map((channel) => channel.theme))
    );
    const uniqueLang = Array.from(
      new Set(channels.map((channel) => channel.language))
    );

    setThemes(uniqueThemes);
  
    setLang(uniqueLang);
  }, [channels]);
  return (
    <div className="filters">
      <h2>Фильтры</h2>
      {/* <div className="by_title">
        <input className="filtres-input" placeholder="Поиск..." />
        <button className="filtres-btn">
          <Image
            className="filtres-img"
            src="/assets/images/search_icon.png"
            alt="avatar"
            width={25}
            height={25}
          />
        </button>
      </div> */}
      <form id="search" onSubmit={onSearch} className="by_title">
        <input
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          // onChange={(event) => setSearchQuery(event.target.value.charAt(0).toLowerCase() + event.target.value.slice(1))}
          className="filtres-input"
          placeholder="Поиск..."
        />
        <button className="filtres-btn" onSubmit={onSearch}>
          <Image
            className="filtres-img"
            src="/assets/images/search_icon.png"
            alt="avatar"
            width={25}
            height={25}
          />
        </button>
      </form>
      <div className="theme">
        <p>Тематика:</p>
        <select className="filtres-select" onChange={(event) =>  onThemeFilter(event)}>
          <option className="filters-option" value="">
            Все тематики
          </option>
          {themes && themes.length > 0
            ? themes.map((item) => (
                <option key={item} className="filters-option" value={item}>
                  {item}
                </option>
              ))
            : null}
        </select>
      </div>
      <div className="lang">
        <p>Язык:</p>
        <select className="filtres-select" onChange={(event) => onLangFilter(event)}>
          <option className="filters-option" value="">
            Все языки
          </option>
          {lang && lang.length > 0
            ? lang.map((items) => (
                <option key={items} className="filters-option" value={items}>
                  {items}
                </option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
}
