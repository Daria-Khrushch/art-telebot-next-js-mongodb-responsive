"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const NewCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("channel");
  const [ava, setAva] = useState(
    "https://avatars.githubusercontent.com/u/85594221?s=80&v=4"
  );
  const [theme, setTheme] = useState("погода");
  const [language, setLanguage] = useState("english");
  const [description, setDescription] = useState("Channel about weather");
  const [subscribers, setSubscribers] = useState(0);
  const [views, setViews] = useState(0);
  const [cpv, setCpv] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!channelName) {
      validationErrors.channelName = "Пожалуйста, введите название канала";
    }
    if (!ava) {
      validationErrors.ava = "Пожалуйста, введите URL картинки";
    }
    if (!theme) {
      validationErrors.theme = "Пожалуйста, введите тему канала";
    }
    if (!language) {
      validationErrors.language = "Пожалуйста, введите язык канала";
    }
    if (!description) {
      validationErrors.description = "Пожалуйста, введите описание канала";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      console.log("Send data");
      const res = await fetch("/api/cards/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: ava,
          name: channelName,
          // name: channelName.charAt(0).toLowerCase() + channelName.slice(1),
          theme: theme,
          language: language,
          description: description,
          subscribers: subscribers,
          views: views,
          cpv: cpv,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Обработка успешного ответа
          // console.log(result);
        })
        .catch((error) => {
          // Обработка ошибок
          console.error(error);
        });
    }

    setChannelName("");
    setAva("");
    setTheme("");
    setDescription("");
    setLanguage("");
    setCpv(0);
    setSubscribers(0);
    setViews(0);
    setErrors({});
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card admin-card" onClick={openModal}>
        Добавить новый канал
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form id="buyer-modal-form" onSubmit={handleSubmit} className="modal-form">
          <label className="modal-label">
            Название:
            <input
              className="modal-input"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            {errors.channelName && (
              <span className="error">{errors.channelName}</span>
            )}
          </label>

          <label className="modal-label">
            Аватар:
            <input
              className="modal-input"
              type="text"
              value={ava}
              onChange={(e) => setAva(e.target.value)}
            />
            {errors.ava && <span className="error">{errors.ava}</span>}
          </label>

          <label className="modal-label">
            Тема:
            <input
              className="modal-input"
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            {errors.theme && <span className="error">{errors.theme}</span>}
          </label>

          <label className="modal-label">
            Язык канала:
            <input
              className="modal-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            {errors.language && (
              <span className="error">{errors.language}</span>
            )}
          </label>

          <label className="modal-label">
            Количество просмотров:
            <input
              className="modal-input"
              type="number" inputMode="numeric"
              value={views}
              onChange={(e) => setViews(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            Колличество подписчиков:
            <input
              className="modal-input"
              type="number" inputMode="numeric"
              value={subscribers}
              onChange={(e) => setSubscribers(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            CPV:
            <input
              className="modal-input"
              type="number" inputMode="numeric"
              value={cpv}
              onChange={(e) => setCpv(parseInt(e.target.value))}
            ></input>
          </label>

          <label className="modal-label">
            Описание:
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          <button type="submit">Отправить</button>
        </form>
      </Modal>
    </>
  );
};

export default NewCard;
